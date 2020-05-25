import comments from './comments.json'

export const getRandomComment = (): string => {
  return encodeURIComponent(
    comments[Math.floor(Math.random() * comments.length)]
  )
}
