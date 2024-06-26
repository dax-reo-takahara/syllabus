<template lang="pug">
//- 1. 'app' を v-bind せずに直接 id="app" と書くべきです。
.test-review(v-bind:id="'test-review'")
  //- 20. buttonタグを使って可読性を上げる
  .basic-btn(@click="onClick") Clickable
  //- 22. クラス名は複数単語で命名
  .information-area
    input.information-input(v-model="inputValue" @keyup.enter="onEnterSearch" placeholder="検索")
    .searched-item
      | 検索結果: {{ searchedItem }}

  //- 5. v-forとv-ifが別の要素で使用してください
  //- 9. keyが未設定なので選択状態がバグりませんか
  .item-list(
    v-for="item, i in items"
    v-if="showItems"
    @click="selectItem(i)"
  )
    //- 23. 動的に付与するクラスなのでis-selectedとしてください
    .item-list-inner(:class="{ selected: selectedIndex === i }")
      span {{ item.name }}
      .basic-btn(@click.stop="addItem(i)") Add
      .basic-btn(@click.stop="removeItem(i)") Remove

  .basic-btn(@click="handleClick('Click')")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";

type PrimaryKey = {
  id: number;
};

// 11. 型は継承してまとめるべきです
type Items = {
  name: string;
  description?: string;
};

export default defineComponent({
  name: "TestReview",

  props: {
    /** 変更されない名称 */
    propName: {
      type: String,
      // 8. スペルミスです。required にしてください。
      require: false,
    },
  },

  setup(props, { emit }) {
    // 7. リアクティブにする必要はなさそうです
    // 14. 定数名が具体的でない
    /** ボタンのクリック数 */
    const btnClickCount = ref<number>(0);

    /** inputの値 */
    const inputValue = ref("");

    /** 検索したitem */
    const searchedItem = ref();

    // 10. anyを使用せず型定義をしてください
    /** 選択したindex */
    const selectedIndex = ref<any>();

    /** itemsのidにするためのカウント */
    let itemIdCount = 0;

    /** 表示するitemリスト */
    const items = ref<(Items & PrimaryKey)[]>([
      { id: 0, name: "john" },
      { id: 1, name: "jane" },
    ]);

    /** itemリストの表示 */
    const showItems = computed<boolean>(() => {
      switch (props?.propName) {
        case "review":
          return true;
        case "patternB":
          return true;
        case "patternC":
          return false;
        default:
          return false;
      }
    });

    /**
      * カウンターを更新
      */
    const handleClick = () => {
      btnClickCount.value++;
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
      // 16. findの方が良いのでは？
      const target = items.value.filter(
        (item) => item.name == inputValue.value
      );
      // 31: targetがなかったらエラーになりませんか？
      searchedItem.value = target[0].name;
    }

    // 13. onClickが何をクリックするのか関数名に明示されていない
    // 関数の定義と戻り値が異なっている
    /**
      * クリックイベント
      */
    function onClick() {
      emit("click");
    }

    /**
      * item追加
      * @param index index
      */
    function addItem(index: number) {
      const newItem = {
        id: itemIdCount,
        name: `Item ${itemIdCount}`,
      };
      items.value.splice(index + 1, 0, newItem);
      itemIdCount++;
    }

    /**
      * item削除
      * @param index index
      */
    function removeItem(index: number) {
      items.value.splice(index, 1);
    }

    return {
      btnClickCount,
      inputValue,
      searchedItem,
      selectedIndex,
      items,
      showItems,
      handleClick,
      selectItem,
      onEnterSearch,
      onClick,
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
.information-input {
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

.item-list {
  margin: 0;
  padding: 0;
  border: 1px solid;
}

.item-list-inner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

  /* 27. 影響範囲を考慮していますか？ */
  /* 23. 動的なクラスはis-xxxにしてください */
  .selected {
    background-color: rgb(253, 179, 183);
  }
}
</style>
