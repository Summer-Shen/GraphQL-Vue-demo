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

    <el-dialog
      title="修改交通流量"
      :visible.sync="trafficDialogVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="交通流量">
          <el-input-number
            v-model="currTraffic"
            :precision="0"
            :step="100"
            :min="1"
          ></el-input-number>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="trafficDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmTraffic()">修改</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="道路详情" :visible.sync="roadDialogVisible" width="30%">
      <el-form style="overflow: hidden">
        <el-form-item label="类型" size="mini">
          {{ currRoad ? parseRoadType(currRoad.__typename) : "" }}
        </el-form-item>
        <el-form-item label="道路ID" size="mini">
          {{ currRoad ? currRoad.id : "" }}
        </el-form-item>
        <el-form-item label="名称" size="mini">
          {{ currRoad ? currRoad.name : "" }}
        </el-form-item>
        <el-form-item label="是否单行" size="mini">
          {{ currRoad ? (currRoad.isOneway ? "单行" : "双向") : "" }}
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import gql from "graphql-tag";

const GET_INTERSECTIONS = gql`
  query {
    getIntersections {
      id
      name
      traffic
      roads {
        id
        name
      }
    }
  }
`;

const GET_ROAD = gql`
  query($id: String!) {
    getRoad(roadId: $id) {
      id
      name
      isOneway
    }
  }
`;

const SET_TRAFFIC = gql`
  mutation($intersectionId: String!, $trafficInput: Int!) {
    setTraffic(intersectionId: $intersectionId, trafficInput: $trafficInput)
  }
`;

export default {
  name: "Home",

  data() {
    return {
      tableData: [],

      roadDialogVisible: false,
      currRoad: null,

      trafficDialogVisible: false,
      currIntersectionId: null,
      currTraffic: 0,
    };
  },

  apollo: {
    tableData: {
      query: GET_INTERSECTIONS,
      update(data) {
        return data.getIntersections;
      },
    },
  },

  methods: {
    showRoad(roadId) {
      this.roadDialogVisible = true;
      this.$apollo
        .query({
          query: GET_ROAD,
          variables: {
            id: roadId,
          },
        })
        .then((resp) => {
          this.currRoad = resp.data.getRoad;
        });
    },

    handleEditTraffic(id) {
      this.trafficDialogVisible = true;
      this.currIntersectionId = id;
    },

    confirmTraffic() {
      this.$apollo
        .mutate({
          mutation: SET_TRAFFIC,
          variables: {
            intersectionId: this.currIntersectionId,
            trafficInput: this.currTraffic,
          },
        })
        .then((resp) => {
          if (resp.data.setTraffic === "OK") {
            this.$message({
              showClose: true,
              message: "修改成功！",
              type: "success",
            });
          }
        });
      this.trafficDialogVisible = false;
    },

    parseRoadType(typename) {
      switch (typename) {
        case "Highway":
          return "高快速道路";
        case "UrbanRoad":
          return "市区道路";
        default:
          return "未知";
      }
    },
  },
};
</script>
