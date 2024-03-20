<template>
  <CommonCard
    :icon="icon"
    :title="title"
    :isLoading="isLoading"
    :hasError="hasError"
    :limitedList="limitedList"
  >
    <template scope="props">
      <div v-show="Object.keys(posts).length && !hasError">
        <v-row class="mb-n4">
          <v-col>
            <v-row>
              <v-col
                v-for="(post, index) in posts"
                :key="index"
                cols="12"
                :class="!props.listsAll && 'limited-list2'"
              >
                <v-card class="post-wrap" :href="post.href" target="_blank">
                  <img class="post-img" v-show="post.image" :src="post.image" />
                  <h4>{{ post.titulo }}</h4>
                  <small>
                    {{ post.intro }}
                    <b>[Ler mais]</b>
                  </small>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </template>
  </CommonCard>
</template>

<script>
import CommonCard from '@/components/common/CommonCard';

export default {
  name: 'PostList',
  components: { CommonCard },
  props: {
    limitedList: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posts: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    hasError: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
