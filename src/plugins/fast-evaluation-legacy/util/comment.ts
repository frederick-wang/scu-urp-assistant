import comments from './comments.json'

export const getRandomComment = (): string =>
  comments[Math.floor(Math.random() * comments.length)]
