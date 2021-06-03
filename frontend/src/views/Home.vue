<template>
  <el-container class="home">
    <el-header>
      <h1>路口交通流量</h1>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="路口ID" width="120">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="240">
        </el-table-column>
        <el-table-column
          prop="traffic"
          label="小时交通流量"
          width="150"
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="mini" @click="handleEditTraffic(scope.row.id)"
              >更新流量</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="roads" label="交会道路">
          <template #default="scope">
            <el-button
              v-for="road in scope.row.roads"
              :key="road.id"
              size="mini"
              @click="showRoad(road.id)"
              >{{ road.name }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      tableData: [],
    };
  },
};
</script>
