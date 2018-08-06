<template>
  <div>
    <div v-if="uploadMode">
      <div v-if="uploadErrors.length > 1" class="row u-mb-medium">
        <div class="col-md-12">
          <ul class="well error-well">
            <li v-for="error in uploadErrors">{{error}}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 u-mb-medium">
          <v-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-success="vsuccess"
                      @vdropzone-error="verror"></v-dropzone>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'UploadInfo',
    props: {
      dropzoneOptions: {type: Object}
    },
    data: function () {
      return {
        uploadMode: true,
        error: false,
        uploadErrors: [],
        errorMessage: '',
        rows: [],
        columns: []
      }
    },
    methods: {
      vsuccess(file, response) {
        // this.rows = response.data;
        // this.columns = response.headers;
        // this.uploadMode = false;
        // this.error = false;
        // this.$emit("uploadsave", this.rows, this.columns)
        this.$toasted.show("File Uploaded. Job Id: " + response.job_id, {
          icon: "info",
          type: "info",
          duration: 6000
        })
      },
      verror(file, message, xhr) {
        // this.error = true;
        // this.errorMessage = message.message;
        // this.uploadErrors = message.errors;
        this.$toasted.show("File Upload Error." + message.message, {
          icon: "error",
          type: "error",
          duration: 6000
        })
      },
    }
  }
</script>
<style></style>
