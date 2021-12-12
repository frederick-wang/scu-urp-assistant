export const btn = require('./btn.pug') as () => string

export const prompt = require('./prompt.pug') as () => string

export const selectionModal = require('./selectionModal.pug') as (payload: {
  checkboxWrappers: [string, string][]
}) => string

export const checkbox = require('./checkbox.pug') as (payload: {
  name: string
  index: number
  curriculum: string
}) => string
