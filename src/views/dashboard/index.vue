<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ITable from '@/components/ITable/ITable.vue'
import IPageHeader from '@/components/IPageHeader/IPageHeader.vue'
import useEnterAnimation from '@/hooks/useEnterAnimation'

const dataSource = ref([
  {
    key: 1,
    taskNum: 'T 23121101',
    taskName: '任务A',
    createTime: '2023-12-11 15:23:23',
    updateTime: '2023-12-11 15:23:23',
    status: '进行中',
  },
  {
    key: 2,
    taskNum: 'T 23121102',
    taskName: '任务B',
    createTime: '2023-12-11 15:23:23',
    updateTime: '2023-12-11 15:23:23',
    status: '已完成',
  },
  {
    key: 3,
    taskNum: 'T 23121102',
    taskName: '任务C',
    createTime: '2023-12-11 15:23:23',
    updateTime: '2023-12-11 15:23:23',
    status: '已完成',
  },
  {
    key: 4,
    taskNum: 'T 23121102',
    taskName: '任务D',
    createTime: '2023-12-11 15:23:23',
    updateTime: '2023-12-11 15:23:23',
    status: '已完成',
  },
  {
    key: 5,
    taskNum: 'T 23121102',
    taskName: '任务E',
    createTime: '2023-12-11 15:23:23',
    updateTime: '2023-12-11 15:23:23',
    status: '已完成',
  },
])
const columns = ref([
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '任务编号',
    dataIndex: 'taskNum',
    key: 'taskNum',
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '最后更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
])
onMounted(() => {
  useEnterAnimation('.ant-space-item', { type: 'y' })
})
</script>

<template>
  <div class="dashboard">
    <div class="content">
      <a-space direction="vertical" size="large" style="width: 100%">
        <i-page-header
          :sub-title="$t('app.welcome')"
          class="dashboard-page-header"
          style="width: 100%"
          title="USERNAME"
        >
          <div class="header-wrapper">
            <div class="avatar">
              <div class="avatar-img">
                <Icon icon="UserOutlined" />
              </div>
            </div>
            <div class="title-wrapper">
              <div class="title">早安, USERNAME, 开始您一天的工作吧！</div>
              <div class="sub-title">今日晴，20℃ - 32℃！</div>
            </div>
          </div>
        </i-page-header>
        <div class="card-panel">
          <i-card class="card-item">
            <div class="card-item-title">本月新增任务</div>
            <div class="card-item-content">
              <div class="card-item-statics">786K</div>
              <div class="card-item-icon">
                <Icon icon="UserOutlined" />
              </div>
            </div>
          </i-card>
          <i-card class="card-item">
            <div class="card-item-title">本月累计任务</div>
            <div class="card-item-content">
              <div class="card-item-statics">76</div>
              <div class="card-item-icon">
                <Icon icon="UserOutlined" />
              </div>
            </div>
          </i-card>
          <i-card class="card-item">
            <div class="card-item-title">数据仓数量</div>
            <div class="card-item-content">
              <div class="card-item-statics">$56K</div>
              <div class="card-item-icon">
                <Icon icon="UserOutlined" />
              </div>
            </div>
          </i-card>
          <i-card class="card-item">
            <div class="card-item-title">最新通知</div>
            <div class="card-item-content">
              <div class="card-item-statics">99+</div>
              <div class="card-item-icon">
                <Icon icon="UserOutlined" />
              </div>
            </div>
          </i-card>
        </div>
        <i-card>
          <i-table :columns="columns" :data-source="dataSource">
            <template #title-left>
              <Icon icon="ContactsOutlined" />
              任务列表
            </template>
            <template #title-right>
              <a-button type="primary">
                <Icon icon="PlusCircleOutlined" />
                新建任务
              </a-button>
            </template>
            <template #action>
              <a-button type="link">
                <Icon icon="EditOutlined" />
              </a-button>
              <a-button type="link">
                <Icon icon="DeleteOutlined" />
              </a-button>
            </template>
          </i-table>
        </i-card>
      </a-space>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.dashboard {
  .dashboard-page-header {
    width: 100%;
    @include useTheme {
      background: getModeVar('cardBgColor');
    }

    .header-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        border-radius: 999px;
        background: #ffffff;
        margin-right: 20px;

        @media screen and (max-width: 768px) {
          margin-right: 0;
          margin-bottom: 20px;
        }

        .avatar-img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 70px;
          border-radius: 999px;
          background: #1677ff;
          font-size: 30px;
          color: #ffffff;
        }
      }

      .title-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 100%;

        .title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .sub-title {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }

  .card-panel {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-gap: 24px;

    @media screen and (max-width: 1600px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .card-item {
      $colors: (
        1: rgb(250, 125, 121),
        2: rgb(84, 172, 208),
        3: rgb(175, 80, 208),
        4: rgb(255, 204, 102),
      );
      @each $key, $value in $colors {
        &:nth-child(#{$key}) {
          color: $value;

          .card-item-statics {
            background: linear-gradient(90deg, rgba($value, 0.2) 0%, rgba($value, 0.1) 10%, rgba($value, 0.01) 100%);
          }

          .card-item-icon {
            border-color: $value !important;
          }
        }
      }

      .card-item-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .card-item-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;

        .card-item-statics {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          width: 150px;
          padding: 10px;
          font-size: 24px;
          font-weight: 600;
        }

        .card-item-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 30px;
          width: 70px;
          height: 70px;
          border-radius: 999px;
          font-size: 30px;
          font-weight: 600;
          border: 1px #ffffff solid;
        }
      }
    }
  }
}
</style>
