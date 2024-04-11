<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { computed, reactive, ref } from 'vue'
import type {
  CertificateInfoFormType,
  ProjectInfoFormType,
  SelfIntroductionFormType,
  SkillInfoFormType,
  WorkExpInfoFormType,
} from '@/apis/application'
import type { UserInfoType } from '@/apis/user'

const userStore = useUserStore()
const userInfo = computed<UserInfoType>(() => userStore.userInfo)

const activeKey = ref('1')

const workExpInfoForm = reactive<WorkExpInfoFormType>({
  companyName: '', // 公司名称
  industry: '', // 所属行业
  position: '', // 职位
  positionType: '', // 职位类别
  startTime: '', // 开始时间
  endTime: '', // 结束时间
  salary: '', // 当时月薪
  workContent: '', // 工作内容
})

const projectInfoForm = reactive<ProjectInfoFormType>({
  projectName: '', // 项目名称
  projectType: '', // 项目类型
  startTime: '', // 开始时间
  endTime: '', // 结束时间
  projectContent: '', // 项目描述
})

const skillInfoForm = reactive<SkillInfoFormType>({
  skillName: '', // 技能名称
  skillUsingTime: '', // 使用时长
  skillLevel: '', // 技能等级
})

const certificateInfoForm = reactive<CertificateInfoFormType>({
  certificateName: '', // 证书名称
  certificateTime: '', // 获得时间
})

const selfIntroductionForm = reactive<SelfIntroductionFormType>({
  selfIntroduction: '', // 个人评价
})
</script>

<template>
  <div class="application-page">
    <div class="application-page-left">
      <user-panel :userInfo="userInfo">
        <template #float-top>
          <a-button type="primary" @click="$router.push('/user/previewApplication')">查看在线简历</a-button>
        </template>
        <template #float-bottom>
          <a-button type="text" @click="$router.push('/user/center')"> 编辑个人信息</a-button>
        </template>
      </user-panel>
      <i-card class="application-panel card">
        <a-tabs v-model:activeKey="activeKey" tab-position="left">
          <a-tab-pane key="1" tab="工作/实习经历">
            <div class="user-info">
              <a-page-header title="工作/实习经历" />
              <a-form :label-col="{ span: 2 }" :model="workExpInfoForm" class="user-info-form" label-align="left">
                <a-form-item label="公司名称">
                  <a-input v-model:value="workExpInfoForm.companyName" />
                </a-form-item>
                <a-form-item label="所属行业">
                  <a-input v-model:value="workExpInfoForm.industry" />
                </a-form-item>
                <a-form-item label="职位">
                  <a-input v-model:value="workExpInfoForm.position" />
                </a-form-item>
                <a-form-item label="职位类别">
                  <a-input v-model:value="workExpInfoForm.positionType" />
                </a-form-item>
                <a-form-item label="开始时间">
                  <a-input v-model:value="workExpInfoForm.startTime" />
                </a-form-item>
                <a-form-item label="结束时间">
                  <a-input v-model:value="workExpInfoForm.endTime" />
                </a-form-item>
                <a-form-item label="当时月薪">
                  <a-input v-model:value="workExpInfoForm.salary" />
                </a-form-item>
                <a-form-item label="工作内容">
                  <a-input v-model:value="workExpInfoForm.workContent" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary">保存</a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" force-render tab="项目经历">
            <a-page-header title="项目经历" />
            <a-form :label-col="{ span: 2 }" :model="projectInfoForm" class="user-info-form" label-align="left">
              <a-form-item label="项目名称">
                <a-input v-model:value="projectInfoForm.projectName" />
              </a-form-item>
              <a-form-item label="项目类型">
                <a-input v-model:value="projectInfoForm.projectType" />
              </a-form-item>
              <a-form-item label="开始时间">
                <a-input v-model:value="projectInfoForm.startTime" />
              </a-form-item>
              <a-form-item label="结束时间">
                <a-input v-model:value="projectInfoForm.endTime" />
              </a-form-item>
              <a-form-item label="项目内容">
                <a-input v-model:value="projectInfoForm.projectContent" />
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="3" tab="专业技能">
            <a-page-header title="专业技能" />
            <a-form :label-col="{ span: 2 }" :model="skillInfoForm" class="user-info-form" label-align="left">
              <a-form-item label="技能名称">
                <a-input v-model:value="skillInfoForm.skillName" />
              </a-form-item>
              <a-form-item label="使用时长">
                <a-input v-model:value="skillInfoForm.skillUsingTime" />
              </a-form-item>
              <a-form-item label="技能等级">
                <a-input v-model:value="skillInfoForm.skillLevel" />
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="4" tab="竞赛证书">
            <a-page-header title="竞赛证书" />
            <a-form :label-col="{ span: 2 }" :model="certificateInfoForm" class="user-info-form" label-align="left">
              <a-form-item label="证书名称">
                <a-input v-model:value="certificateInfoForm.certificateName" />
              </a-form-item>
              <a-form-item label="获得时间">
                <a-input v-model:value="certificateInfoForm.certificateTime" />
              </a-form-item>
            </a-form>
          </a-tab-pane>

          <a-tab-pane key="5" tab="个人评价">
            <a-page-header title="个人评价" />
            <a-form :label-col="{ span: 3 }" :model="selfIntroductionForm" class="user-info-form" label-align="left">
              <a-form-item label="自我介绍内容">
                <a-input v-model:value="selfIntroductionForm.selfIntroduction" />
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </i-card>
    </div>
    <div class="application-page-right">
      <div class="upload-application card">
        <div class="title">导入简历</div>
        <a-divider />
        <div class="sub-title">请上传DOC、DOCX、PDF格式的中文简历，大小不超过20M</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px">
          <div class="upload">
            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
              <template #default>
                <a-button style="width: 100%" type="primary">
                  <Icon icon="UploadOutlined" />
                  上传简历
                </a-button>
              </template>
            </a-upload>
          </div>
          <div class="list">
            <a-button>
              <Icon icon="FolderOpenOutlined" />
              所有简历
            </a-button>
          </div>
        </div>
      </div>
      <div class="optimize-application card">
        <div class="title">简历待优化</div>
        <a-divider />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.application-page {
  @apply flex space-x-5 mt-10;
  .application-page-left {
    @apply flex flex-col space-y-5 mx-auto w-full;
  }

  .application-page-right {
    @apply flex flex-col w-[calc(5/19*100%)] space-y-5;

    .upload-application {
      @apply h-fit p-5 rounded-[var(--border-radius)] shadow-lg box-border;

      @include useTheme {
        background-color: getModeVar('cardBgColor');
      }

      .title {
        @apply text-lg font-bold;
      }

      .sub-title {
        @apply text-sm text-gray-500;
      }
    }

    .optimize-application {
      @apply p-5;

      @include useTheme {
        background-color: getModeVar('cardBgColor');
      }

      .title {
        @apply text-lg font-bold;
      }
    }
  }
}
</style>
