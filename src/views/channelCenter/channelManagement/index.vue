<template>
    <div>
        <el-form
            label-width="80px"
            class="search-div"
            :inline="true"
            @submit.native.prevent
        >
            <el-form-item label="渠道">
                <el-input v-model="searchParams.channelKey" placeholder="渠道名称/渠道编号/联系方式" style="width: 246px" />
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker
                    v-model="searchParams.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="$constant.defaultTime"
                />
            </el-form-item>
            <el-form-item label="渠道类型">
                <el-select v-model="searchParams.channelType" placeholder="请选择">
                    <el-option label="全部" value="" />
                    <el-option
                        v-for="item in $constant.channelType"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchParams.status" placeholder="请选择">
                    <el-option
                        v-for="(item,index) in statusList"
                        :key="index"
                        :label="item.label"
                        :value="item.key"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="onSearch()">查询</el-button>
                <el-button @click="reset()">重置</el-button>
            </el-form-item>
        </el-form>

        <el-card class="anoCard">
            <div class="header-btn">
                <el-button
                    v-auth:xz
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    @click="doAction('add','0')"
                >
                    新增
                </el-button>
            </div>
            <el-table
                v-loading="loading"
                :data="list"
                align="center"
                border
                stripe
            >
                <el-table-column type="index" label="序号" width="80" />
                <el-table-column prop="channelName" label="渠道名称" />
                <el-table-column prop="number" label="渠道编号" />
                <el-table-column label="渠道类型">
                    <template slot-scope="scope">
                        <div>
                            <!--                            {{ $constant.channelType.filter((item)=>{return item.key==scope.row.channelType})[0].label }}-->
                            {{ $utils.forJudgment(scope.row.channelType,$constant.channelType,'key','label') }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="chargePhone" label="联系方式" />
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.row.createTime?scope.row.createTime.replace('T',' '):'暂无时间' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <div>
                            <!--                            {{ statusList.filter((item)=>{return item.key==scope.row.status})[0].label }}-->
                            {{ $utils.forJudgment(scope.row.status,statusList,'key','label') }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == 1"
                            v-auth:jy
                            type="text btn-text-red"
                            size="small"
                            @click.native.prevent="changeStatus('禁用',scope.row)"
                        >
                            <i class="el-icon-error" /> 禁用
                        </el-button>
                        <el-button
                            v-if="scope.row.status == 2"
                            v-auth:qy
                            type="text btn-text-green"
                            size="small"
                            @click.native.prevent="changeStatus('启用',scope.row)"
                        >
                            <i class="el-icon-success" /> 启用
                        </el-button>
                        <el-button
                            v-auth:bj
                            type="text btn-text-primary"
                            size="small"
                            @click.native.prevent="doAction('edit',scope.row.id)"
                        >
                            <i class="el-icon-edit" /> 编辑
                        </el-button>
                        <el-button
                            v-auth:xq
                            type="text btn-text-info"
                            size="small"
                            @click.native.prevent="doAction('info',scope.row.id)"
                        >
                            <i class="el-icon-view" /> 详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-page">
                <el-pagination
                    :page-sizes="pageSizes"
                    :layout="pageLayout"
                    :current-page="page"
                    :total="total"
                    :page-size="pageSize"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </el-card>
    </div>
</template>

<script>
  import mixin from '@/mixins/list'

  export default {
    name: 'ChannelManagement',
    mixins: [mixin],
    data() {
      return {
        searchParams: {
          time: '',
          channelKey: "",//渠道名称/编号/联系方式
          channelType: '',//渠道类型
          status: '',//启用状态
        },
        actions: ['back', 'save'],
        statusList: [{
          key: '',
          label: '全部'
        }, {
          key: 1,
          label: '正常'
        }, {
          key: 2,
          label: '停用'
        },]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
      },
      reset() {
      },
      doAction(page, row) {
        this.$router.push({name: 'ChannelManagementInfo', params: {page: page, id: row}})
      },
      // 启用 && 禁用
      changeStatus(type, row) {
      }
    }
  }
</script>
