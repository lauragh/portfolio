export interface Project {
  title: string,
  imgSrc: string[]
}


export interface ProjectDetails {
  project: ProjectName,
  title: string,
  description: string[],
  images: string[],
  technologies: string[],
  languages: string[],
  challenge?: string,
  solution?: string[],
  video?: string,
  caption?: string,
  tasks?: string[],
  videoYoutube?: string,
  videoCaption?: string,
}

export enum ProjectName {
  configurator = "configurator",
  digitalTwin = "digitalTwin",
  teleassistance = "teleassistance",
  catalog = "catalog",
  game = "game",
  mobbler = "mobbler",
  weather = "weather",
  cobli = "cobli"
}
