<template lang="pug">
.sua-container-scu-uietp
  .row.query-wrapper
    .col-sm-12
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-search
        |
        | 历年大创查询
      .profile-user-info.profile-user-info-striped.self
        .profile-info-row
          .profile-info-name
            | 请输入项目名称关键字、项目参与学生名字或项目指导老师名字查询
          .profile-info-value
            .profile-info-value
              input#major(type='text', name='major' v-model.trim='queryStr')
  .row.result-wrapper
    Loading(v-if='!loadingIsDone')
    .col-sm-12(v-if='!hasNotQueried && loadingIsDone')
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-table
        |
        | 查询结果
      p(v-if='!scuUietpList.length')
        | 抱歉，根据您输入的关键字在
        strong 四川大学教务处公示的历年“大学生创新创业训练计划”国家级、省级、校级项目名单
        | 中查询，没有得到结果。
      p(v-if='scuUietpList.length')
        | 以下是根据您输入的关键字在
        strong 四川大学教务处公示的历年“大学生创新创业训练计划”国家级、省级、校级项目名单
        | 中查询得到的结果，共
        |
        strong {{scuUietpList.length}}
        |
        | 项。
      table.table.table-hover.table-bordered.table-striped(v-if='scuUietpList.length')
        thead
          tr
            th.center 序号
            th.center 立项年份
            th.center 学院
            th.center 项目名称
            th.center 项目负责人
            th.center 参与学生人数
            th.center 项目其他成员
            th.center 学校导师
            th.center 立项级别
            th.center 申请类别
            th.center 立项类别
        tbody
          tr(v-for='(v, i) in scuUietpList' :key='v.projectYear+v.collegeName+v.projectName')
            td.center {{ i + 1 }}
            td.center {{ v.projectYear }}
            td.center {{ v.collegeName }}
            td.center {{ v.projectName }}
            td.center {{ v.projectLeaderName }}
            td.center {{ v.participantNumber }}
            td.center {{ v.otherMemberInformation }}
            td.center {{ v.schoolSupervisorName }}
            td.center {{ v.projectLevel }}
            td.center {{ v.applicationCategory }}
            td.center {{ v.projectCategory }}
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { actions, Request } from '@/store'
import Loading from '@/plugins/common/components/Loading.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { debounce } from 'lodash-es'

@Component({
  components: { Loading }
})
export default class ScuUietp extends Vue {
  hasNotQueried = true
  loadingIsDone = true
  // [立项年份，学院名称，项目名称，项目负责人姓名，参与学生人数，项目其他成员信息，学校导师姓名，立项级别，申请类别，立项类别][]
  scuUietpList: Array<{
    projectYear: number
    collegeName: string
    projectName: string
    projectLeaderName: string
    participantNumber: number
    otherMemberInformation?: string
    schoolSupervisorName: string
    projectLevel: string
    applicationCategory?: string
    projectCategory: string
  }> = []
  queryStr = ''
  query = debounce(async function(this: ScuUietp, val: string): Promise<void> {
    this.loadingIsDone = false
    try {
      const { list } = await actions[Request.SCU_UIETP_LIST](val)
      this.scuUietpList = list.map(v => ({
        projectYear: v.project_year,
        collegeName: v.college_name,
        projectName: v.project_name,
        projectLeaderName: v.project_leader_name,
        participantNumber: v.participant_number,
        otherMemberInformation: v.other_member_information
          ? v.other_member_information
              .split(',')
              .map(s => s.split('/')[0])
              .join('，')
          : '',
        schoolSupervisorName: v.school_supervisor_name,
        projectLevel: v.project_level,
        applicationCategory: v.application_category,
        projectCategory: v.project_category
      }))
      this.loadingIsDone = true
      if (this.hasNotQueried) {
        this.hasNotQueried = false
      }
      emitDataAnalysisEvent('历届大创查询', '查询成功', {
        查询参数: `${this.queryStr}`
      })
    } catch (error) {
      emitDataAnalysisEvent('历届大创查询', '查询失败', {
        查询参数: `${this.queryStr}`
      })
    }
  }, 500)

  @Watch('queryStr')
  onQueryChanged(val: string): void {
    this.query(val)
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-top: 0;
}

.result-wrapper {
  margin-top: 10px;
  table td {
    vertical-align: middle;
  }
}
.profile-info-row {
  display: flex;

  .profile-info-name {
    width: auto;
    display: flex;
    align-items: center;
    padding-right: 20px;
    padding-left: 20px;
  }
  .profile-info-value {
    flex: 1;
    display: flex;
    align-items: center;

    input#major {
      width: 40% !important;
      min-width: 200px;
    }
  }
}
</style>
