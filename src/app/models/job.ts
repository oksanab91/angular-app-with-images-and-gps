
export class JobBasic {
    id: number
    title: string
    location: string
    date: string
    url: string
    salary: string
    description: string
    company_name: string
    category: string
    tags: string[]
    job_type: string
    site: string
}

export class JobRemote {
    id: number
    title: string    
    url: string
    salary: string
    description: string
    company_name: string
    category: string //{id: number, name: string, slug: string}
    tags: string[]
    job_type: string
    publication_date: string
    candidate_required_location: string    
}

export class JobGreenhouse {
    id: number
    title: string
    location: string   
    url: string
    salary: string
    description: string
    company_name: string
    absolute_url: string  
    updated_at: string    
}

export class JobFilter {
    category: string
    tags: string
    candidate_required_location: string
    displayCount: number
}
