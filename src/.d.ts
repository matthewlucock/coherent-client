declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare const SERVER_PORT: number
