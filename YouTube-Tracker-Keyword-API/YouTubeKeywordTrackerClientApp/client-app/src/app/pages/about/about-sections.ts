interface IAboutSection {
    name: string;
    label: string;
}

export interface IAboutSections {
    author: IAboutSection,
    technologies: IAboutSection,
    description: IAboutSection,
}

export const AboutSections: IAboutSections = {
    author: {
        name: 'author',
        label: 'O autorze',
    },
    technologies: {
        name: 'technologies',
        label: 'Technologie',
    },
    description: {
        name: 'description',
        label: 'Opis projektu',
    }
}