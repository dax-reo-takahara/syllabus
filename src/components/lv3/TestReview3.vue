<template lang="pug">
//- 32. divは不要
//- 21. ファイル名/クラス名/IDは揃えた方が良いのでは
div#test-review.test-review
  button.btn(@click="onClickBtn") Clickable
  //- 22. クラス名は複数単語で命名
  div.information
    input(
      v-model="inputValue"
      @keyup.enter="onEnterSearch"
      placeholder="検索"
    )
    div.searched
      | 検索結果: {{ searchedItem }}

  //- 5. v-forとv-ifが別の要素で使用してください
  div.item(
    v-for="item, i in items"
    @click="selectItem(i)"
  )
    //- 9. keyが未設定なので選択状態がバグりませんか
    //- 23. 動的に付与するクラスなのでis-selectedとしてください
    div.item-inner(
      v-if="showItems"
      :class="{ 'is-selected': selectedIndex === i }"
    )
      span {{ item.name }}
      button.btn(@click.stop="addItem(i)") Add
      button.btn(@click.stop="removeItem(i)") Remove

      button.btn(@click="handleClick('Click')")
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
      required: false,
    },
  },

  setup(props, { emit }) {
    // 7. リアクティブにする必要はなさそうです
    // 14. 定数名が具体的でない
    /** ボタンのクリック数 */
    const count = ref<number>(0);

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
      count.value++;
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

    // 33. 関数の定義と戻り値が異なっている
    /**
      * クリックイベント
      */
    function onClickBtn(): any {
      // 3. emitのイベント名の最初に 'on' は不要です。
      emit("on-click");
    }

    /**
      * item追加
      * @param index index
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
/* 26. クラス以外は詳細度が高くなるので禁止です */
/* 27. 影響範囲を考慮していますか？ */
input {
  border-radius: 10px;
  border: 2px solid blue;
  /* 25. important必要ですか？ */
  margin: 5px !important;
}

.searched {
  height: 15px;
  /* 24. 汎用的な値はSCSS変数にしてください */
  font-size: 12px;
  margin: 10px;
}

.btn {
  width: 80px;
  border: 1px solid;
  cursor: pointer;
}

.item {
  margin: 0;
  padding: 0;
  border: 1px solid;
}

.item-inner {
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
