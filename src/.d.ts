declare module '*.scss' {
  const content: Readonly<{ [className: string]: string }>
  export default content
}

declare const SERVER_PORT: number
