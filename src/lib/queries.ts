import { sanity } from './sanity'
import type { Project, Service } from './types'

export async function getProjects() {
    return sanity.fetch<Project[]>(`*[_type == "project"] | order(year desc)`)
}

export async function getFeaturedProjects() {
    return sanity.fetch<Project[]>(
        `*[_type == "project" && featured == true] | order(year desc)`
    )
}

export async function getServices(brand: string) {
    return sanity.fetch<Service[]>(
        `*[_type == "service" && brand == $brand] | order(order asc)`,
        { brand }
    )
}

export async function getTeamMembers(brand: string) {
    return sanity.fetch(
        `*[_type == "teamMember" && brand == $brand] | order(order asc)`,
        { brand }
    )
}

export async function getSiteSettings(brand: string) {
    return sanity.fetch(
        `*[_type == "siteSettings" && brand == $brand][0]`,
        { brand }
    )
}

export async function getRecentProjects(limit: number = 6) {
    return sanity.fetch<Project[]>(
        `*[_type == "project"] | order(year desc) [0...$limit]{
      title, client, category, year, slug, videoUrl,
      "posterUrl": poster.asset->url
    }`,
        { limit }
    )
}

export async function getProjectsByBrand(brand: string, limit: number = 6) {
    return sanity.fetch<Project[]>(
        `*[_type == "project" && brand == $brand] | order(year desc) [0...$limit]{
      title, client, category, year, slug, videoUrl,
      "posterUrl": poster.asset->url
    }`,
        { brand, limit }
    )
}

export async function getAllProjects() {
    return sanity.fetch<Project[]>(
        `*[_type == "project"] | order(year desc){
      title, client, category, year, slug, videoUrl, featured,
      "posterUrl": poster.asset->url
    }`
    )
}

export async function getProjectBySlug(slug: string) {
    return sanity.fetch<Project | null>(
        `*[_type == "project" && slug.current == $slug][0]{
      title, client, category, year, videoUrl, featured, description, services,
      "posterUrl": poster.asset->url,
      "galleryUrls": gallery[].asset->url
    }`,
        { slug }
    )
}