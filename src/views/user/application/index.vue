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
const fileList = ref([])
const applicationUploadLoading = ref(false)
const compLoading = computed({
  get: () => {
    return applicationUploadLoading.value
  },
  set: (val) => {
    if (applicationUploadLoading.value === true && val == false) {
      Object.assign(projectInfoForm, {
        projectName: 'Oj-判题评测云',
        projectType: '',
        startTime: '2023年12月',
        endTime: '2024年1月',
        projectContent:
          '基于 Spring Cloud 微服务 + MQ + Docker 的编程题目评测系统。系统能够根据管理员预设的题目用例对用户提交的代码进行执行和评测系统中\n' +
          '自主实现的代码沙箱 可作为 独立服务供其他开发者调用\n' +
          '技术选型 : SpringBoot + Spring loud Alibaba ( Nacos、 Gateway, OpenFeign)+ MYSQL + Redis + RabbitMQ + Docker代码沙箱+\n' +
          'Java 安全管理器+分布式Session\n' +
          '系统架构:根据功能职责，将系统划分为负责核心业务的后端模块、负责校验结果的判题模块、负责编译执行代码的可复用代码沙箱。各模块相E\n' +
          '独立，并通过API接口和分包的方式实现协作。\n' +
          '自主设计判题机模块的架构，定义了代码沙箱的抽象调用接口和多种实现类(比如远程/ 第三方代码沙箱，并通过 静态工厂模式 + Spring 配\n' +
          '置化的方式实现了对多种代码沙箱的灵活调用。\n' +
          '通过编写Java 脚本自测代码沙箱，模拟了多种程序异常情况并针对性解决，如使用守护线程 + Thread.sleep 等待机制实现了对进程的超时中\n' +
          '断、使用JVM -Xmx 参数限制用户程序占用的最大堆内存、使用 黑白名单 + 字典 的方式实现了对敏感操作的限制。\n' +
          '为保证沙箱宿主机的稳定性，选用 Docker 隔离用户代码，使用 Docker ava 库创建容器隔离执行代码，并通过 Tty 和 Docker 进行传参交\n' +
          '互，从而实现了更安全的代码沙箱。\n' +
          '由于 Java 原生和 Docker 代码沙箱的实现流程完全一致(编译、执行、获取输出、清理，选用 模方法模式 定义了一套标准的流程并允许子\n' +
          '类自行扩展部分流程，提高代码一致性并大幅简化冗余代码。',
      })
      Object.assign(skillInfoForm, {
        skillName: '', // 技能名称
        skillUsingTime: '', // 使用时长
        skillLevel: '', // 技能等级
        skillContent:
          '具备扎实的Java编程基础，熟悉常用集合类(LinkedList,HashMap )、反射等，能用Java8 Stream API 高效操作集合类，结合 lambda 表\n' +
          '达式完成数据处理;\n' +
          '熟悉JVM、内存模型、GC，了解JVM调优，使用过VM参数进行内存限制，使用过JConsoleJVisualVm工具进行内存监控和分析\n' +
          '熟悉 Spring 的 AOP、事务、Bean的生命周期、三级缓存解决循环依赖等，并独立翻阅过源码进行理解;\n' +
          '熟悉关系型数据库 MYSQL及库表设计，熟悉索引、事务隔离级别和锁机制等，能够通过创建索引、Explain分析等方式优化性能\n' +
          '熟悉非关系型数据库Redis(基础数据结构、缓存、分布式锁等)，了解缓存穿透、雪崩、击穿等解决方案，并能使用Redisson/Jedis 实现分布\n' +
          '锁;\n' +
          '了解 SpringCloud 的核心组件构成及实际应用(如 Gateway、Nacos、OpenFeign等),能够开发分布式/微服务项目，有过将单体项目改造\n' +
          '为微服务项目的实践，并整理出改造最佳实践笔记;\n' +
          '了解 RabbitMQ消息队列，有过手动消息确认、交换机队列定义、消息生产消费的实践;\n' +
          '了解 Docker 容器化技术的，熟悉常用命令和操作(如 docker psa)，能够使用 Docker 部署和管理容器化应用\n' +
          '了解 Linux的基本操作，能通过命令查询进程状态，能使用命令监控系统负载和进程状态;\n' +
          '了解常用设计模式，如策略模式、模板方法模式、工厂模式等。', // 技能内容
      })
      Object.assign(certificateInfoForm, {
        certificateName: '新零售大赛全国二等奖', // 证书名称
        certificateTime: '', // 获得时间
      })
      Object.assign(selfIntroductionForm, {
        selfIntroduction:
          '有较强的自学能力和解决问题能力，在为学校的团学工作中开发出了一款自动录入志愿时长的工具，将原本2-3分钟的繁杂操作缩短至10秒左右，\\n极大提高了工作效率，获得了同学和老师的称赞。\\n在全国新零售大赛和全国数字贸易技能大赛比赛过程中，开发出了一个能够自动操作网页的脚本，将原本需耗时1-2分钟的手动操作替换为仅需5\\n秒左右的自动操作，获得团队成员的一致好评，并成功斩获全国二等奖。\\n每日坚持敲写代码，刷力扣题，精进算法，对于代码格式有较强的规范意识，着重注意注释书写。',
      })
    }
    applicationUploadLoading.value = val
  },
})
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
  skillContent: '', // 技能内容
})

const certificateInfoForm = reactive<CertificateInfoFormType>({
  certificateName: '', // 证书名称
  certificateTime: '', // 获得时间
})

const selfIntroductionForm = reactive<SelfIntroductionFormType>({
  selfIntroduction: '', // 个人评价
})

const applicationOptimizeList = ref([
  {
    title: '未上传真实头像',
    description: '请上传真实头像',
  },
  {
    title: '简历内容不完整',
    description: '请完善简历内容',
  },
  {
    title: '简历内容不规范',
    description: '请检查简历内容是否符合规范',
  },
])
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
      <a-spin tip="分析中..." size="large" :spinning="compLoading">
        <i-card class="application-panel card">
          <a-tabs v-model:activeKey="activeKey" tab-position="left">
            <a-tab-pane key="1" force-render tab="项目经历">
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
                  <a-textarea v-model:value="projectInfoForm.projectContent" :rows="5" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary">保存</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="工作/实习经历">
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
                    <a-textarea v-model:value="workExpInfoForm.workContent" :rows="5" />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary">保存</a-button>
                  </a-form-item>
                </a-form>
              </div>
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
                <a-form-item label="技能内容">
                  <a-textarea v-model:value="skillInfoForm.skillContent" :rows="5" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary">保存</a-button>
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
                <a-form-item>
                  <a-button type="primary">保存</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>

            <a-tab-pane key="5" tab="个人评价">
              <a-page-header title="个人评价" />
              <a-form :label-col="{ span: 3 }" :model="selfIntroductionForm" class="user-info-form" label-align="left">
                <a-form-item label="自我介绍内容">
                  <a-textarea v-model:value="selfIntroductionForm.selfIntroduction" :rows="5" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary">保存</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
        </i-card>
      </a-spin>
    </div>
    <div class="application-page-right">
      <div class="upload-application card">
        <div class="title">导入简历</div>
        <a-divider />
        <div class="sub-title">请上传DOC、DOCX、PDF格式的中文简历，大小不超过20M</div>
        <application-upload v-model:file-list="fileList" v-model:loading="compLoading" />
      </div>
      <div class="optimize-application card">
        <div class="title">简历待优化</div>
        <a-divider />
        <a-list :data-source="applicationOptimizeList">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :title="item.title" :description="item.description" style="align-items: center">
                <template #avatar>
                  <Icon icon="WarningOutlined" :size="30" style="color: red" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
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
