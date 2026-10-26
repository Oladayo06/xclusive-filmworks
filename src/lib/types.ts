export type Project = {
    title: string
    client: string
    category: string
    year: string
    featured?: boolean
    videoUrl?: string
    posterUrl?: string
    slug?: { current: string }
    description?: string
    services?: string[]
    galleryUrls?: string[]
}

export type Service = {
    number: string
    title: string
    description: string
    brand?: string
}