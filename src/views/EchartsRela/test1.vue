<template>
  <div class="content-box">
    <div class="container">
      <p>关系图</p>
      <div v-show="nodeData.length" v-cloak class="container-list">
        <div class="container-item">
          <span id="chart1" style="width: 1280px; height: 500px"></span>
        </div>
      </div>
      <div v-show="!nodeData.length" class="container-Bot">
        <h5>暂无数据</h5>
      </div>
    </div>
  </div>
</template>
<script>
import echJsonData from "@/components/generator/echarts.json";
export default {
  data() {
    return {
      nodeData: [],
      linkData: [],
      echJsonData,
      ecrt1: null,
      jsonData: [{ id: "", tag: "" }],
    };
  },
  created() {
    this.nodeData = this.echJsonData.data;
  },
  mounted() {
    this.drawChart1();
  },
  methods: {
    drawChart1() {
      this.ecrt1 = this.$echarts.init(document.getElementById("chart1"));
      let legend0 = "image://" + require("@/assets/dataRelated/metedata.png");
      let legend1 = "image://" + require("@/assets/dataRelated/metedata.png");
      let legend2 = "image://" + require("@/assets/dataRelated/task.png");
      let legend3 = "image://" + require("@/assets/dataRelated/API.png");
      let legend4 = "image://" + require("@/assets/dataRelated/assets.png");
      var indexObj = { task: 0, meta: 0, table: 0, base: 0 };
      this.jsonData = this.echJsonData.data;

      this.jsonData.forEach((node) => {
        if (node.parent) {
          node.value.forEach((valueItem) => {
            var values = this.jsonData.filter(
              (obj) => obj.id == node.parent.id
            )[0].value;
            values.forEach((parentValue) => {
              this.linkData.push({
                draggable: true,
                source: parentValue.data,
                target: valueItem.data,
                lineStyle: {
                  opacity: 1,
                  width: 2,
                  curveness: 0,
                  color: "#f6bd68",
                },
                value: "",
              });
            });
          });
        }
        if (node.tag === "meta") {
          node.value.forEach((valueItem) => {
            indexObj.meta++;
            this.nodeData.push({
              x: 100,
              y: 60,
              name: valueItem.data,
              symbol: legend0,
              draggable: true,
            });
          });
        } else if (node.tag === "task") {
          node.value.forEach((valueItem) => {
            indexObj.task++;
            this.nodeData.push({
              x: 400,
              y: 60 ,
              name: valueItem.data,
              symbol: legend2,
              draggable: true,
            });
          });
        } else if (node.tag === "table") {
          node.value.forEach((valueItem) => {
            indexObj.table++;
            this.nodeData.push({
              x: 700,
              y: 60 * indexObj.table,
              name: valueItem.data,
              symbol: legend1,
              draggable: true,
            });
          });
        } else if (node.tag === "base") {
          node.value.forEach((valueItem) => {
            indexObj.base++;
            this.nodeData.push({
              x: 1000,
              y: 60 * indexObj.base,
              name: valueItem.data,
              symbol: legend4,
              draggable: true,
            });
          });
        } else {
          var i = 0;
          this.nodeData.value.forEach((valueItem) => {
            i++;
            this.nodeData.push({
              x: 1000,
              y: 40 * i,
              name: valueItem.data,
              symbol: legend3,
              draggable: true,
            });
          });
        }
      });
      var counter = {};
      this.nodeData.forEach((node) => {
        if (counter[node.name]) {
          counter[node.name] += 1;
        } else {
          counter[node.name] = 1;
        }
      });
      var repeatArr = [];
      this.nodeData.forEach((node) => {
        if (counter[node.name] == 1) {
          repeatArr.push(node);
        } else {
          counter[node.name] -= 1;
        }
      });

      this.nodeData = repeatArr;
      let option = {
        series: {
          type: "graph",
          layout: "none",
          draggable: true, //节点是否可拖拽，只在使用力引导布局的时候有用。
          focusNodeAdjacency: true,
          legendHoverLink: true, //是否启用图例 hover 时的联动高亮。
          circular: {
            rotateLabel: true,
          },
          roam: false,
          symbolSize: 100,
          categories: [
            { name: "未感染" },
            { name: "无症状感染" },
            { name: "确诊病例" },
          ],
          label: {
            show: true,
            align: "center",
            textStyle: { fontSize: 18, color: "#000" },
            formatter: (params) => {
              return `${params.name}`;
            },
            position: "bottom",
          },
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [6, 10],
          edgeLabel: {
            show: true,
            textStyle: { fontSize: 10 },
            formatter: "{c}",
          },
          data: this.nodeData,
          links: this.linkData,
        },
      };
      this.ecrt1.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.container-list {
  width: 100%;
  margin: 0 auto;
  .container-item{
    margin-top:100px;
  }
}
.container-Bot {
  margin: 15% 43%;
}
</style>