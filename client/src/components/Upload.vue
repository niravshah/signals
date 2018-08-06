<template>
  <div class="container-fluid">
    <div class="row u-m-auto">
      <div class="col-md-12">
        <upload-info :dropzoneOptions="dropzoneOptions" @uploadsave="uploadSave"></upload-info>
      </div>
    </div>
  </div>
</template>
<script>
  import UploadInfo from "./_partials/_upload";
  export default {
    name: 'Upload',
    components: {UploadInfo},
    data: function () {
      return {
        dropzoneOptions: {
          url: 'http://localhost:5001/api/upload',
          createImageThumbnails: false,
          maxFilesize: 20,
          acceptedFiles: 'text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dictDefaultMessage: 'Drop files here or click to upload'
        }
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Dashboard");
    },
    methods: {
      uploadSave: function (rows, columns) {
        console.log('Upload Save');
      }
    }
  }
</script>
<style></style>
