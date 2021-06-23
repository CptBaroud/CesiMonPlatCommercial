<template>
  <el-table :data="tableData">
    <el-table-column min-width="50" type="index" />
    <el-table-column
      min-width="150"
      prop="name"
      label="Name"
    />
    <el-table-column
      min-width="200"
      prop="job"
      label="Job Position"
    />
    <el-table-column
      min-width="150"
      prop="salary"
      label="Salary"
    />
    <el-table-column
      min-width="150"
      header-align="right"
      label="Actions"
    >
      <div slot-scope="{}" class="text-right">
        <el-tooltip
          content="Info"
          :open-delay="300"
          placement="top"
        >
          <base-button type="info" size="sm" icon>
            <i class="tim-icons icon-single-02" />
          </base-button>
        </el-tooltip>

        <el-tooltip
          content="Settings"
          :open-delay="300"
          placement="top"
        >
          <base-button type="success" size="sm" icon>
            <i class="tim-icons icon-settings" />
          </base-button>
        </el-tooltip>

        <el-tooltip
          content="Delete"
          :open-delay="300"
          placement="top"
        >
          <base-button type="danger" size="sm" icon>
            <i class="tim-icons icon-simple-remove" />
          </base-button>
        </el-tooltip>
      </div>
    </el-table-column>
  </el-table>
</template>

<script>
import { Table, TableColumn } from 'element-ui'

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      tableData: [{
        id: 1,
        name: 'Dakota Rice',
        salary: '$36.738',
        country: 'Niger',
        city: 'Oud-Turnhout'
      }, {
        id: 2,
        name: 'Minerva Hooper',
        salary: '$23,789',
        country: 'Curaçao',
        city: 'Sinaai-Waas'
      },
      {
        id: 3,
        name: 'Sage Rodriguez',
        salary: '$56,142',
        country: 'Netherlands',
        city: 'Baileux'
      },
      {
        id: 4,
        name: 'Philip Chaney',
        salary: '$38,735',
        country: 'Korea, South',
        city: 'Overland Park'
      },
      {
        id: 5,
        name: 'Doris Greene',
        salary: '$63,542',
        country: 'Malawi',
        city: 'Feldkirchen in Kärnten'
      }]
    }
  }
}
</script>
