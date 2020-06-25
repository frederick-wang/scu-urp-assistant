<template lang="pug">
.course-card-wrapper
  .course-card
    .card-header
      .course-name {{courseName}}
      .course-number {{courseNumber}}-{{courseSequenceNumber}}
      .course-info-list
        el-tag.list-tag(size='mini' :type='coursePropertyName === "必修" ? "success" : "danger"') {{ coursePropertyName }}
        el-tag.list-tag(size='mini' type='warning' :title='courseTeacherFullText') {{ courseTeacherTruncatedText }}
    .card-body
      el-divider 标签
      .tag-list
        el-tag.list-tag(size='mini') 从不点名
        el-tag.list-tag(size='mini') 没有作业
        el-tag.list-tag(size='mini') 善解人意
        el-tag.list-tag(size='mini') 开卷考试
      el-divider 五维度评分
      ul.rate-list
        li.rate-item
          .item-title 课程价值
          .item-value
            el-rate(v-model='course.courseValue' disabled show-score)
        li.rate-item
          .item-title 教学态度
          .item-value
            el-rate(v-model='course.teachingAttitude' disabled show-score)
        li.rate-item
          .item-title 教学组织
          .item-value
            el-rate(v-model='course.teachingOrganization' disabled show-score)
        li.rate-item
          .item-title 师生和谐度
          .item-value
            el-rate(v-model='course.teacherStudentRelationship' disabled show-score)
        li.rate-item
          .item-title 功课难度
          .item-value
            el-rate(v-model='course.homeworkDifficulty' disabled show-score)
      el-divider 主观评价
      .comment
        .comment-text {{ comment }}
    .card-footer
      el-button.revaluate-btn(type='primary' icon='el-icon-edit' size='medium') 重新评价
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CourseScoreRecordWithInfoExchange } from '../types'

@Component({
  components: {}
})
export default class CourseCard extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  course!: CourseScoreRecordWithInfoExchange

  get courseName(): string {
    return this.course.courseName
  }

  get courseNumber(): string {
    return this.course.courseNumber
  }

  get courseSequenceNumber(): string {
    return this.course.courseSequenceNumber
  }

  get coursePropertyName(): string {
    return this.course.coursePropertyName
  }

  get courseTeacherList(): {
    teacherNumber: string
    teacherName: string
  }[] {
    return this.course.courseTeacherList.filter(
      ({ teacherNumber }) => !teacherNumber.includes('zj')
    )
  }

  get courseTeacherTruncatedText(): string {
    const maxLength = 3
    const unblind = ' 等'
    return this.courseTeacherList.length <= maxLength
      ? this.courseTeacherList.map(v => v.teacherName).join('、')
      : this.courseTeacherList
          .slice(0, maxLength)
          .map(v => v.teacherName)
          .join('、') + unblind
  }

  get courseTeacherFullText(): string {
    return this.courseTeacherList.map(v => v.teacherName).join('、')
  }

  get comment(): string {
    const maxLength = 100
    const unblind = '……'
    return this.course.comment.length <= maxLength
      ? this.course.comment
      : this.course.comment.slice(0, maxLength - unblind.length) + unblind
  }
}
</script>

<style lang="scss" scoped>
$screen-xs-max: 479px;
$screen-sm-min: 480px;
$screen-md-min: 800px;
$screen-lg-min: 1200px;
$screen-xl-min: 1600px;

// Extra Small devices
@mixin xs {
  @media (max-width: #{$screen-xs-max}) {
    @content;
  }
}

// Small devices
@mixin sm {
  @media (min-width: #{$screen-sm-min}) {
    @content;
  }
}

// Medium devices
@mixin md {
  @media (min-width: #{$screen-md-min}) {
    @content;
  }
}

// Large devices
@mixin lg {
  @media (min-width: #{$screen-lg-min}) {
    @content;
  }
}

// Extra large devices
@mixin xl {
  @media (min-width: #{$screen-xl-min}) {
    @content;
  }
}

.course-card-wrapper {
  @include xs {
    width: percentage(1);
  }

  @include sm {
    width: percentage(1);
  }

  @include md {
    width: percentage(1/2);
  }

  @include lg {
    width: percentage(1/3);
  }

  @include xl {
    width: percentage(1/4);
  }

  padding: 20px;

  .course-card {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 100%;
    display: flex;
    flex-direction: column;

    .card-header {
      padding: 0 20px;
      padding-top: 16px;

      .course-name {
        font-size: 16px;
        line-height: 2;
      }

      .course-number {
        font-size: 14px;
        line-height: 2;
      }

      .course-info-list {
        margin-top: 5px;

        .list-tag {
          margin-right: 5px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .card-body {
      padding: 0 20px;
      padding-bottom: 16px;
      flex: 1;

      .tag-list {
        .list-tag {
          margin-right: 5px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .rate-list {
        .rate-item {
          display: flex;

          .item-title {
          }

          .item-value {
            flex: 1;
            text-align: right;
          }
        }
      }

      .comment {
      }
    }

    .card-footer {
      text-align: center;
      padding: 0 20px;
      padding-bottom: 16px;

      .revaluate-btn {
        width: 100%;
      }
    }
  }
}
</style>
