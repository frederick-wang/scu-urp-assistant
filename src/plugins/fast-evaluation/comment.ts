import comments from './comments.json'

export const getComment = (): string => {
  return encodeURIComponent(
    comments[Math.floor(Math.random() * comments.length)]
  )
}
