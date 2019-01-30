<template>
  <div><OrgModeEditor /></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import OrgModeEditor from '@/components/OrgModeEditor.vue';

@Component({
  components: {
    OrgModeEditor
  }
})
export default class Editor extends Vue {}
</script>
