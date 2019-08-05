interface TrainingSchemeCourse {
  courseName: string
  courseNumber: string
  coursePropertyName: string
  courseAttributes: string[]
  courseMajor: string
  [key: string]: any
}

interface TrainingSchemeYearItem {
  name: string
  children: TrainingSchemeSemesterItem[]
}

interface TrainingSchemeSemesterItem {
  name: string
  children: TrainingSchemeCourse[]
}

interface JhFajhb {
  fajhh: string
  nj: string
  xsh: string
  zyh: string
  zyfxh?: string
  zym: string
  zyfxm?: string
  famc: string
  jhmc: string
  xwdm?: string
  bylxdm?: string
  xzlxdm: string
  xdlxdm: string
  fajhlxm: string
  ksxndm: string
  xqlxdm: string
  ksxqdm: string
  pymb?: string
  xdyq?: string
  yqzxf: number
  kczxf: number
  kczms: number
  kczxs: number
  bz: string
  xsm: string
  fajhlx: string
  xqlxm: string
  xdlxmc: string
  xzlxmc: string
  xnmc: string
  xqm: string
  njmc: string
  bylxmc?: string
  xwm?: string
  id?: string
  ckchengshuxing?: string
  renshu?: string
  [key: string]: string | number | undefined
}

export {
  TrainingSchemeCourse,
  TrainingSchemeYearItem,
  TrainingSchemeSemesterItem,
  JhFajhb
}
