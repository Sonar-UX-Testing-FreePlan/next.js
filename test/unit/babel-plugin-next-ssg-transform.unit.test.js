/* eslint-env jest */
import { transform } from 'next/dist/build/swc'

const trim = (s) => s.join('\n').trim().replace(/^\s+/gm, '')

const swc = async (code) => {
  let output = await transform(code, {
    jsc: {
      parser: {
        syntax: 'ecmascript',
        jsx: true,
      },
      transform: {
        react: {
          pragma: '__jsx',
        },
      },
      target: 'es2021',
    },
    minify: true,
  })
  return output.code
}

describe('babel plugin (next-ssg-transform)', () => {
  describe('getStaticProps support', () => {
    it('should remove re-exported variable declarations', async () => {
      const output = await swc(trim`
        const getStaticPaths = () => {
          return []
        }

        export { getStaticPaths }

        export default function Test() {
          return <div />
        }
      `)

      expect(output).toMatchInlineSnapshot(
        `"export var __N_SSG=true;export default function Test(){return __jsx(\\"div\\",null);}"`
      )
    })

    it('should remove re-exported variable declarations (safe)', async () => {
      const output = await swc(trim`
        const getStaticPaths = () => {
          return []
        }, a = 2

        export { getStaticPaths }

        export default function Test() {
          return <div />
        }
      `)

      expect(output).toMatchInlineSnapshot(
        `"const a=2;export var __N_SSG=true;export default function Test(){return __jsx(\\"div\\",null);}"`
      )
    })

    it('should remove re-exported function declarations', async () => {
      const output = await swc(trim`
        function getStaticPaths() {
          return []
        }

        export { getStaticPaths }

        export default function Test() {
          return <div />
        }
      `)

      expect(output).toMatchInlineSnapshot(
        `"export var __N_SSG=true;export default function Test(){return __jsx(\\"div\\",null);}"`
      )
    })

    it('should not crash for class declarations', async () => {
      const output = await swc(trim`
        function getStaticPaths() {
          return []
        }

        export { getStaticPaths }

        export class MyClass {}

        export default function Test() {
          return <div />
        }
      `)

      expect(output).toMatchInlineSnapshot(
        `"export var __N_SSG=true;export class MyClass{}export default function Test(){return __jsx(\\"div\\",null);}"`
      )
    })

    it(`should remove re-exported function declarations' dependents (variables, functions, imports)`, async () => {
      const output = await swc(trim`
        import keep_me from 'hello'
        import {keep_me2} from 'hello2'
        import * as keep_me3 from 'hello3'

        import drop_me from 'bla'
        import { drop_me2 } from 'foo'
        import { drop_me3, but_not_me } from 'bar'
        import * as remove_mua from 'hehe'

        var leave_me_alone = 1;
        function dont_bug_me_either() {}

        const inceptionVar = 'hahaa';
        var var1 = 1;
        let var2 = 2;
        const var3 = inceptionVar + remove_mua;

        function inception1() {var2;drop_me2;}

        function abc() {}
        const b = function() {var3;drop_me3;};
        const b2 = function apples() {};
        const bla = () => {inception1};

        function getStaticProps() {
          abc();
          drop_me;
          b;
          b2;
          bla();
          return { props: {var1} }
        }

        export { getStaticProps }

        export default function Test() {
          return <div />
        }
      `)

      expect(output).toMatchInlineSnapshot(
        `"import keep_me from'hello';import{keep_me2}from'hello2';import*as keep_me3 from'hello3';import{but_not_me}from'bar';var leave_me_alone=1;function dont_bug_me_either(){}export var __N_SSG=true;export default function Test(){return __jsx(\\"div\\",null);}"`
      )
    })

    it('should not mix up bindings', async () => {
      const output = await swc(trim`
        function Function1() {
          return {
            a: function bug(a) {
              return 2;
            }
          };
        }

        function Function2() {
          var bug = 1;
          return { bug };
        }

        export { getStaticProps } from 'a'
      `)

      expect(output).toMatchInlineSnapshot(
        `"function Function1(){return{a:function bug(a){return 2;}};}function Function2(){var bug=1;return{bug};}"`
      )
    })

    it('should support class exports', async () => {
      const output = await swc(trim`
        export function getStaticProps() {
          return { props: {} }
        }

        export default class Test extends React.Component {
          render() {
            return <div />
          }
        }
      `)

      expect(output).toMatchInlineSnapshot(
        `"export var __N_SSG=true;export default class Test extends React.Component{render(){return __jsx(\\"div\\",null);}}"`
      )
    })

    it('should support class exports 2', async () => {
      const output = await swc(trim`
        export function getStaticProps() {
          return { props: {} }
        }

        class Test extends React.Component {
          render() {
            return <div />
          }
        }

        export default Test;
      `)

      expect(output).toMatchInlineSnapshot(
        `"class Test extends React.Component{render(){return __jsx(\\"div\\",null);}}export var __N_SSG=true;export default Test;"`
      )
    })

    it('should support export { _ as default }', async () => {
      const output = await swc(trim`
        export function getStaticProps() {
          return { props: {} }
        }

        function El() {
          return <div />
        }

        export { El as default }
      `)

      expect(output).toMatchInlineSnapshot(
        `"function El(){return __jsx(\\"div\\",null);}export var __N_SSG=true;export{El as default};"`
      )
    })

    it('should support export { _ as default } with other specifiers', async () => {
      const output = await swc(trim`
        export function getStaticProps() {
          return { props: {} }
        }

        function El() {
          return <div />
        }

        const a = 5

        export { El as default, a }
      `)

      expect(output).toMatchInlineSnapshot(
        `"function El(){return __jsx(\\"div\\",null);}const a=5;export var __N_SSG=true;export{El as default,a};"`
      )
    })

    it('should support export { _ as default } with a class', async () => {
      const output = await swc(trim`
        export function getStaticProps() {
          return { props: {} }
        }

        class El extends React.Component {
          render() {
            return <div />
          }
        }

        const a = 5

        export { El as default, a }
      `)

      expect(output).toMatchInlineSnapshot(
        `"class El extends React.Component{render(){return __jsx(\\"div\\",null);}}const a=5;export var __N_SSG=true;export{El as default,a};"`
      )
    })

    it('should support full re-export', async () => {
      const output = await swc(trim`
        export { getStaticProps, default } from 'a'
      `)

      expect(output).toMatchInlineSnapshot(
        `"export var __N_SSG=true;export{default}from'a';"`
      )
    })

    it('should support babel-style memoized function', async () => {
      const output = await swc(trim`
        function fn() {
          fn = function () {};
          return fn.apply(this, arguments);
        }
        export function getStaticProps() {
          fn;
        }
        export default function Home() { return <div />; }
      `)

      expect(output).toMatchInlineSnapshot(
        `"export var __N_SSG=true;export default function Home(){return __jsx(\\"div\\",null);}"`
      )
    })

    it('destructuring assignment (object)', async () => {
      const output = await swc(trim`
        import fs from 'fs';
        import other from 'other';

        const {readFile, readdir, access: foo} = fs.promises;
        const {a,b, cat: bar,...rem} = other;

        export async function getStaticProps() {
          readFile;
          readdir;
          foo;
          b;
          cat;
          rem;
        }
        export default function Home() { return <div />; }
      `)

      expect(output).toMatchInlineSnapshot(
        `"import other from'other';const{a,cat:bar}=other;export var __N_SSG=true;export default function Home(){return __jsx(\\"div\\",null);}"`
      )
    })

    it('destructuring assignment (array)', async () => {
      const output = await swc(trim`
        import fs from 'fs';
        import other from 'other';

        const [a, b, ...rest]= fs.promises;
        const [foo, bar] = other;

        export async function getStaticProps() {
          a;
          b;
          rest;
          bar;
        }
        export default function Home() { return <div />; }
      `)

      expect(output).toMatchInlineSnapshot(
        `"import other from'other';const[foo]=other;export var __N_SSG=true;export default function Home(){return __jsx(\\"div\\",null);}"`
      )
    })

    it('errors for incorrect mix of functions', () => {
      expect(() =>
        swc(trim`
          export function getStaticProps() {}
          export function getServerSideProps() {}
        `)
      ).toThrowError(
        `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`
      )

      expect(() =>
        swc(trim`
          export function getServerSideProps() {}
          export function getStaticProps() {}
        `)
      ).toThrowError(
        `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`
      )

      expect(() =>
        swc(trim`
          export function getStaticPaths() {}
          export function getServerSideProps() {}
        `)
      ).toThrowError(
        `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`
      )

      expect(() =>
        swc(trim`
          export function getServerSideProps() {}
          export function getStaticPaths() {}
        `)
      ).toThrowError(
        `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`
      )
    })
  })
})
