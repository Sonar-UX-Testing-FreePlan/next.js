import { experimental_use as use } from 'react'
import { fetchCategoryBySlug } from '../getCategories'

export default function Page({ params }) {
  const category = use(fetchCategoryBySlug(params.categorySlug))
  if (!category) return null

  return <h1>All {category.name}</h1>
}
