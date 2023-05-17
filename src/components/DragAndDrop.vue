<template>
    <div class="d-flex flex-column">
        <span>Documentos</span>
        <div class="drag-and-drop" @dragover="dragover" @dragleave="dragleave" @drop="drop">
            <input type="file" name="fields[assetsFieldHandle][]" multiple id="assetsFieldHandle" @change="onChange" @click="resetImageUploader" ref="file" accept=".pdf,.jpg,.jpeg,.png" />
        
            <div class="container-filename">
                <span class="filename" v-for="(f, i) in filelist" :key="i">
                    {{ !!f ? f.name : '' }}
                    <button class="ml-auto" type="button" @click="remove(i)" title="Remove file" v-if="!!f">
                        <v-icon>mdi-close</v-icon>
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { watch } from 'vue';
import { mapActions } from 'vuex'
export default {
  name: 'DragAndDrop',
  data() {
    return {
        filelist: null
    }
  },
  watch: {
    filelist(val){
        this.$emit('changeFileList', [...this.$refs.file.files])
    }
  },
  methods: {
    ...mapActions("ipfs", ['addFile']),
    resetImageUploader(){
        this.$refs.file.value = '';
    },
    onChange() {
      this.filelist = [...this.$refs.file.files]
    },
    remove(i) {
        this.filelist.splice(i, 1)
    },
    dragover(event) {
        event.preventDefault();
        // Add some visual fluff to show the user can drop its files
        if (!event.currentTarget.classList.contains('active')) {
            event.currentTarget.classList.remove('bg-gray-100');
            event.currentTarget.classList.add('active');
        }
    },
    dragleave(event) {
        // Clean up
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('active');
    },
    drop(event) {
        event.preventDefault();
        this.$refs.file.files = event.dataTransfer.files;
        this.onChange(); // Trigger the onChange event manually
        // Clean up
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('active');
    },
    async uploadDocuments(){
        try {
            let res = await this.addFile(this.filelist)
            console.log("res", res)
            if(res.success){
                this.filelist = null
            }
        } catch (error) {
            console.log("error", error)
        }
    }
  }
}
</script>
<style lang="scss">
.drag-and-drop{
    background: #ededed;
    padding: 35px;
    border: 1px dashed #000000;
    border-radius: 1px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    &.active{
        background: #ceebdd;
    }
    input{
        cursor: pointer;
        width: 1px;
        height: 1px;
        position: absolute;
        opacity: 0;
        overflow: hidden;
    }
    .container-message-info{
        display: flex;
        width: 100%;
        max-width: 230px;
        .message-info{
            font-size: 22px;
            font-weight: 400;
            color: #000000;
        }
    }
    .container-filename{
        width: 100%;
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        align-items: center;
        gap: 16px;
        min-height: 100px;
        .filename{
            display: flex;
            align-items: center;
            background: #ffffff;
            padding: 6px 12px;
            width: calc(100% - 82px);
            max-width: 23.5%;
            height: 100%;
            max-height: 48px;
            button{
                .v-icon:hover{
                    color: red;
                }
            }
        }
        label{
            cursor: pointer;
            .icon-file{
                display: flex;
            }
        }
    }
    .upload-documents{
        position: absolute;
        bottom: -15px;
        right: -35px;
        color: #ffffff;
        text-transform: none;
    }
}
</style>