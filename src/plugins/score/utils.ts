import { CourseScoreRecord } from './types'

/**
 * 将数值保留3位小数，再作为number返回
 *
 * @param {number} num 待处理的数字
 * @param {number} [fractionDigits=3] 保留小数位数
 * @returns 保留对应位数后的小数
 */
function reserveDigits(num: number, fractionDigits = 3): number {
  return Number(num.toFixed(fractionDigits))
}

/**
 * 计算加权平均数
 *
 * @param {Array<{ value: number; weight: number }>} arr 一个数组，每个对象包括数值(value)和权值(weight)
 * @returns 计算好的加权平均数
 */
function getWeightedAverage(
  arr: Array<{ value: number; weight: number }>
): number {
  return arr
    .reduce(
      (acc, cur) => [acc[0] + cur.value * cur.weight, acc[1] + cur.weight],
      [0, 0]
    )
    .reduce((valueSum, weightSum) => (weightSum ? valueSum / weightSum : 0))
}

/**
 * 将课程数组映射为只包含gpa作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {CourseScoreRecord[]} arr 一个课程数组
 * @returns 一个只包含gpa作为数值，学分作为权值的对象数组
 */
function mapGPA(arr: CourseScoreRecord[]): {
  value: number
  weight: number
}[] {
  return arr.map((v) => ({ value: v.gradePoint || 0, weight: v.credit }))
}

/**
 * 将课程数组映射为只包含分数作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {CourseScoreRecord[]} arr 一个课程数组
 * @returns 一个只包含分数作为数值，学分作为权值的对象数组
 */
function mapScore(arr: CourseScoreRecord[]): {
  value: number
  weight: number
}[] {
  return arr.map((v) => ({ value: v.courseScore || 0, weight: v.credit }))
}

/**
 * 从一个课程数组里筛选出所有成绩合法的课程
 *
 * @param {CourseScoreRecord[]} arr 一个课程数组
 * @returns 筛选出的所有成绩合法的课程（成绩存在且非负）
 */
function removeIllegalScoreCourses(
  arr: CourseScoreRecord[]
): CourseScoreRecord[] {
  return arr.filter((v) => v.courseScore && v.courseScore > 0)
}

/**
 * 从一个课程数组里去除所有辅修课程
 *
 * @param {CourseScoreRecord[]} arr 一个课程数组
 * @returns 去除所有辅修课程后的课程数组
 */
export function removeMinorCourses(
  arr: CourseScoreRecord[]
): CourseScoreRecord[] {
  return arr.filter((v) => v.coursePropertyName !== '辅修')
}

/**
 * 过滤一个课程数组，仅留下辅修课程
 *
 * @param {CourseScoreRecord[]} arr 一个课程数组
 * @returns 仅留下辅修课程后的课程数组
 */
export function reserveMinorCourses(
  arr: CourseScoreRecord[]
): CourseScoreRecord[] {
  return arr.filter((v) => v.coursePropertyName === '辅修')
}

export function getTotalCourseCredits(courses: CourseScoreRecord[]): number {
  return courses.reduce((acc, cur) => acc + cur.credit, 0)
}

/**
 * 从一个课程数组里筛选出所有的必修课程
 *
 * @param {CourseScoreRecord[]} arr 一个课程数组
 * @returns 筛选出的只包括必修课程的数组
 */
function getCompulsoryCourses(arr: CourseScoreRecord[]): CourseScoreRecord[] {
  return arr.filter((v) => v.coursePropertyName === '必修')
}

/**
 * 从一个课程数组里筛选出所有的被选中的课程
 *
 * @param {CourseScoreRecord[]} arr 一个课程数组
 * @returns 筛选出的被选中的课程的数组
 */
function getSelectedCourses(arr: CourseScoreRecord[]): CourseScoreRecord[] {
  return arr.filter((v) => v.selected)
}

/**
 * 输入课程数组，得到全部课程加权平均绩点
 *
 * @param {CourseScoreRecord[]} arr 课程数组
 * @returns 全部课程加权平均绩点
 */
function getAllCoursesGPA(arr: CourseScoreRecord[]): number {
  return reserveDigits(
    getWeightedAverage(mapGPA(removeIllegalScoreCourses(arr)))
  )
}

/**
 * 输入课程数组，得到全部课程加权平均分
 *
 * @param {CourseScoreRecord[]} arr 课程数组
 * @returns 全部课程加权平均分
 */
function getAllCoursesScore(arr: CourseScoreRecord[]): number {
  return reserveDigits(
    getWeightedAverage(mapScore(removeIllegalScoreCourses(arr)))
  )
}

/**
 * 当课程数组存在重修课程时，仅保留该课程的最高成绩
 *
 * @param {CourseScoreRecord[]} arr 课程数组
 * @returns {CourseScoreRecord[]} 去除重复课程后的课程数组
 */
export function reserveHigherCoursesForRetakenCourses(
  arr: CourseScoreRecord[]
): CourseScoreRecord[] {
  return Object.values(
    Object.entries(arr)
      .sort((a, b) => Number(a[1].courseScore) - Number(b[1].courseScore))
      .reduceRight(
        (acc, cur) =>
          acc[cur[1].courseNumber]
            ? acc
            : { ...acc, [cur[1].courseNumber]: cur },
        {} as Record<string, [string, CourseScoreRecord]>
      )
  )
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map((v) => v[1])
}

/**
 * 当课程数组存在重修课程时，仅保留该课程的最新成绩
 *
 * @param {CourseScoreRecord[]} arr 课程数组
 * @returns {CourseScoreRecord[]} 去除重复课程后的课程数组
 */
function reserveNewerCoursesForRetakenCourses(
  arr: CourseScoreRecord[]
): CourseScoreRecord[] {
  return Object.values(
    arr
      .sort((a, b) => Number(a.examTime) - Number(b.examTime))
      .reduceRight(
        (acc, cur) =>
          acc[cur.courseNumber] ? acc : { ...acc, [cur.courseNumber]: cur },
        {} as Record<string, CourseScoreRecord>
      )
  )
}

/**
 * 当课程数组存在重修课程时，仅保留该课程的第一次成绩
 *
 * @param {CourseScoreRecord[]} arr 课程数组
 * @returns {CourseScoreRecord[]} 去除重复课程后的课程数组
 */
function reserveOlderCoursesForRetakenCourses(
  arr: CourseScoreRecord[]
): CourseScoreRecord[] {
  return Object.values(
    arr
      .sort((a, b) => Number(a.examTime) - Number(b.examTime))
      .reduce(
        (acc, cur) =>
          acc[cur.courseNumber] ? acc : { ...acc, [cur.courseNumber]: cur },
        {} as Record<string, CourseScoreRecord>
      )
  )
}

/**
 * 根据分数返回对应的绩点
 *
 * @param {number} score 分数
 * @param {string} semester 学期
 * @returns 绩点
 */
function getPointByScore(
  score: number | undefined,
  semester: string
): number | undefined {
  if (!score) {
    return undefined
  }
  // 2017年起，川大修改了绩点政策，因此要检测学期的年份
  const r = semester.match(/^\d+/)
  if (!r) {
    return undefined
  }
  const enrollmentYear = Number(r[0])
  if (enrollmentYear >= 2017) {
    // 2017-2018秋季学期起使用如下标准（Fall Term 2017-2018~Present）
    if (score >= 90) {
      return 4
    } else if (score >= 85) {
      return 3.7
    } else if (score >= 80) {
      return 3.3
    } else if (score >= 76) {
      return 3
    } else if (score >= 73) {
      return 2.7
    } else if (score >= 70) {
      return 2.3
    } else if (score >= 66) {
      return 2
    } else if (score >= 63) {
      return 1.7
    } else if (score >= 61) {
      return 1.3
    } else if (score >= 60) {
      return 1
    } else {
      return 0
    }
  } else {
    // 2017-2018秋季学期以前使用如下标准（Before Fall Term 2017-2018）
    if (score >= 95) {
      return 4
    } else if (score >= 90) {
      return 3.8
    } else if (score >= 85) {
      return 3.6
    } else if (score >= 80) {
      return 3.2
    } else if (score >= 75) {
      return 2.7
    } else if (score >= 70) {
      return 2.2
    } else if (score >= 65) {
      return 1.7
    } else if (score >= 60) {
      return 1
    } else {
      return 0
    }
  }
}

type LevelName =
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'F'

/**
 * 根据分数返回对应的等级成绩
 *
 * @param {number} score 分数
 * @param {string} semester 学期
 * @returns {LevelName|undefined} 等级成绩
 */
export function getLevelNameByScore(
  score: number | undefined,
  semester: string
): LevelName | undefined {
  if (!score) {
    return undefined
  }
  // 2017年起，川大修改了绩点政策，因此要检测学期的年份
  const r = semester.match(/^\d+/)
  if (!r) {
    return undefined
  }
  const enrollmentYear = Number(r[0])
  if (enrollmentYear >= 2017) {
    // 2017-2018秋季学期起使用如下标准（Fall Term 2017-2018~Present）
    if (score >= 90) {
      return 'A'
    } else if (score >= 85) {
      return 'A-'
    } else if (score >= 80) {
      return 'B+'
    } else if (score >= 76) {
      return 'B'
    } else if (score >= 73) {
      return 'B-'
    } else if (score >= 70) {
      return 'C+'
    } else if (score >= 66) {
      return 'C'
    } else if (score >= 63) {
      return 'C-'
    } else if (score >= 61) {
      return 'D+'
    } else if (score >= 60) {
      return 'D'
    } else {
      return 'F'
    }
  } else {
    // 2017-2018秋季学期以前使用如下标准（Before Fall Term 2017-2018）
    // 这时还没有「等级成绩」的概念
    return undefined
  }
}

type LevelCode =
  | '-20'
  | '-21'
  | '-22'
  | '-23'
  | '-24'
  | '-25'
  | '-26'
  | '-27'
  | '-28'
  | '-29'
  | '-30'

/**
 * 根据分数返回对应的等级成绩代码
 *
 * @param {number} score 分数
 * @param {string} semester 学期
 * @returns {LevelName|undefined} 等级成绩代码
 */
export function getLevelCodeByScore(
  score: number | undefined,
  semester: string
): LevelCode | undefined {
  if (!score) {
    return undefined
  }
  // 2017年起，川大修改了绩点政策，因此要检测学期的年份
  const r = semester.match(/^\d+/)
  if (!r) {
    return undefined
  }
  const enrollmentYear = Number(r[0])
  if (enrollmentYear >= 2017) {
    // 2017-2018秋季学期起使用如下标准（Fall Term 2017-2018~Present）
    if (score >= 90) {
      return '-20'
    } else if (score >= 85) {
      return '-21'
    } else if (score >= 80) {
      return '-22'
    } else if (score >= 76) {
      return '-23'
    } else if (score >= 73) {
      return '-24'
    } else if (score >= 70) {
      return '-25'
    } else if (score >= 66) {
      return '-26'
    } else if (score >= 63) {
      return '-27'
    } else if (score >= 61) {
      return '-28'
    } else if (score >= 60) {
      return '-29'
    } else {
      return '-30'
    }
  } else {
    // 2017-2018秋季学期以前使用如下标准（Before Fall Term 2017-2018）
    // 这时还没有「等级成绩」的概念
    return undefined
  }
}

export {
  getAllCoursesGPA,
  getAllCoursesScore,
  getCompulsoryCourses,
  getSelectedCourses,
  getPointByScore,
  reserveNewerCoursesForRetakenCourses,
  reserveOlderCoursesForRetakenCourses
}
