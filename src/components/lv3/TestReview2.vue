<template lang="pug">
//- 1. 'app' を v-bind せずに直接 id="app" と書くべきです。
//- 21. ファイル名/クラス名/IDは揃えた方が良いのでは
div.review-wrap(v-bind:id="'review'")
  //- 20. buttonタグを使って可読性を上げる
  button.basic-btn(@click="onClickBtn") Clickable
  //- 22. クラス名は複数単語で命名
  .information
    input.input(v-model="inputValue" @keyup.enter="onEnterSearch" placeholder="検索")
    .searched-item
      | 検索結果: {{ searchedItem }}

  //- 2. 複数の属性がある場合は改行して書くべきです。
  //- 5. v-forとv-ifが別の要素で使用してください
  .list-item(v-for="item, i in items" @click="selectItem(i)")
    //- 9. keyが未設定なので選択状態がバグりませんか
    //- 23. 動的に付与するクラスなのでis-selectedとしてください
    .list-item-inner(v-if="showItems" :class="{ 'is-selected': selectedIndex === i }")
      span {{ item.name }}
      button.basic-btn(@click.stop="addItem(i)") Add
      button.basic-btn(@click.stop="removeItem(i)") Remove

  button.basic-btn(@click="handleClick('Click')")
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";

type PrimaryKey = {
  id: number;
};

// 11. 型は継承してまとめるべきです
type Items = {
  name: string;
  description?: string;
};

export default defineComponent({
  name: "CodeReview",

  props: {
    /** 変更されない名称 */
    propName: {
      type: String,
      required: false,
    },
  },

  setup(props, { emit }) {
    // 7. リアクティブにする必要はなさそうです
    // 14. 定数名が具体的でない
    /** ボタンのクリック数 */
    let count = 0;

    /** inputの値 */
    const inputValue = ref("");

    /** 検索したitem */
    const searchedItem = ref();

    // 10. anyを使用せず型定義をしてください
    /** 選択したindex */
    const selectedIndex = ref<any>();

    /** itemリスト */
    const items = ref<(Items & PrimaryKey)[]>([
      { id: 0, name: "john" },
      { id: 1, name: "jane" },
    ]);

    /** itemリストの表示 */
    const showItems = ref<boolean>(false);

    // 6: watchでなくcomputedにするべきです。
    watch(
      () => props.propName,
      (newVal) => {
        // 30. ガード節にできるのでは？
        // 17.switchで良いのでは？
        if (count != null && newVal === "review") {
          showItems.value = true;
        } else if (count != null && newVal === "patternB") {
          showItems.value = true;
        } else if (count != null && newVal === "patternC") {
          showItems.value = false;
        }
      }
      // ??. immediate を設定しないと何も表示されないのでは？
      // { immediate: true }
    );

    /**
      * カウンターを更新
      */
    const handleClick = () => {
      count++;
    };

    /**
      * itemの選択
      * @param index index
      */
    function selectItem(index: number) {
      selectedIndex.value = index;
    }

    /**
      * itemの検索
      */
    function onEnterSearch() {
      const target = items.value.find((item) => item.name == inputValue.value);
      searchedItem.value = target?.name;
    }

    /**
      * クリックイベント
      */
    function onClickBtn() {
      emit("click");
    }

    // 15. 関数の引数に存在しない引数がJSDocに書かれているので削除
    /**
      * item追加
      * @param index index
      * @param key key
      */
    function addItem(index: number) {
      const newItem = {
        // 19. idやnameが重複しますが大丈夫でしょうか？
        id: index,
        name: `Item ${index}`,
      };
      items.value.splice(index + 1, 0, newItem);
    }

    /**
      * item削除
      * @param index index
      */
    function removeItem(index: number) {
      items.value.splice(index, 1);
    }

    return {
      count,
      inputValue,
      searchedItem,
      selectedIndex,
      items,
      showItems,
      handleClick,
      selectItem,
      onEnterSearch,
      onClickBtn,
      addItem,
      removeItem,
    };
  },
});
</script>

<!-- 4. scoped を追加してください。 -->
<style lang="scss">
$font-size: 12px;

/* 27. 影響範囲を考慮していますか？ */
.input {
  border-radius: 10px;
  border: 2px solid blue;
  /* 25. important必要ですか？ */
  margin: 5px !important;
}

.searched-item {
  height: 15px;
  font-size: $font-size;
  margin: 10px;
}

.basic-btn {
  width: 80px;
  border: 1px solid;
  cursor: pointer;
}

.list-item {
  margin: 0;
  padding: 0;
  border: 1px solid;
}

.list-item-inner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

  /* 27. 影響範囲を考慮していますか？ */
  .is-selected {
    background-color: rgb(253, 179, 183);
  }
}
</style>
