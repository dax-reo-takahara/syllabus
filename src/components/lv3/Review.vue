<template lang="pug">
.front-review
  .frontLevel3-btn(@click="onClickBtn")
  .list(v-if="listLength")
    .frontItem(
      v-for="item, i in list"
      v-if="item.isVisible"
      :class="selectedClass"
      @click.stop="$emit('click')"
    )
      .frontItem-inner
        .frontItem-title
          | {{  item.id }}
        .frontItem-description
          | {{  item.description }}

        .frontButtons
          button.frontItem-btn(
            v-if="item.id !== 'separator'"
            @click.stop="$emit('click-btn-add')"
          )
            | 追加
          button.frontItem-btn(
            v-if="item.id !== 'separator'"
            @click.stop="$emit('click-btn-delete')"
          )
        | 削除

    front-list-item(
      :item="item"
      @on-item-click="ItemClick(item)"
      @click-btn-add="onClickButton(i)"
      @click-btn-delete="onClickButtonDelete(i)"
    )
  //- v-elseで良いのでは
  .list(v-if="!listLength")
    | 項目がありません。

</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "@vue/composition-api";

export interface ListItem {
  id: string | "separator";
  name: string;
  description: string;
  authority: "admin" | "guest";
  isSelected: boolean;
}

export default defineComponent({
  name: "Review",

  setup() {
    const DEFAULT_ITEM: ListItem = {
      id: "",
      name: "",
      description: "",
      isSelected: false,
      authority: "admin",
    };

    let itemCountId = 0;

    const list = ref<ListItem[]>([]);
    itemCountId = list.value.length;

    const selectedItem = ref<ListItem>(DEFAULT_ITEM);

    // ・定数名が具体的でない
    const tempList = ref();

    // ・watchでなくcomputedにするべき
    watch(
      list,
      () => {
        tempList.value = list.value;
      }
    );

    // computedなら● / watchは▲ - 項目の数を表示する機能を実装しなさい。
    const listLength = computed(() => list.value.length);

    // リアクティブにする必要ある？
    const selectedType = ref("");

    // nameは削除できる
    // returnがstring | undefinedになるはず
    /**
     * Root要素のクリックイベント
     * @param id id
     * @param selectedType 選択種別
     * @param name 名称
     */
    function onClick(param: { id: string, selectedType?: string }): string {
      // ・selectedTypeでreturn節にするべき
      // ・switchにするべき
      if (selectedType && selectedType === "typeA") {
        // ・console.logを削除
        console.log("A");
        // ・computedにgetterがないのに直接変更している
        listLength.value = 5;
        return;
      }
      else if (selectedType && selectedType === "typeB") {
        return "B";
      }
    }

    // ボタンをクリックしたら、入力欄の値を使用してリストの最後に項目を追加する機能を実装しなさい。
    function onClickBtnAdd() {
      list.value.push({
        ...DEFAULT_ITEM,
        id: String(itemCountId),
        description: selectedItem.value.description,
      });
      itemCountId++;
    }

    function onClick() {
      console.log(item);
    }

    // splice
    // 選択した項目の下に新しい項目を追加する機能を実装しなさい。
    function onClickButton(index: number) {
      const item = { ...DEFAULT_ITEM, id: String(itemCountId) };
      list.value.splice(index + 1, 0, item);
      itemCountId++;
    }

    function onClickButtonDelete(index: number) {
      list.value.splice(index, 1);
    }

    // 入力した情報で選択した項目を入れ替える機能を実装しなさい。

    // イベント伝播を止められるか
    /**
     * root要素のクリック
     */
    function onClickRoot() {
      list.value.forEach((item) => (item.isSelected = false));
      selectedItem.value = DEFAULT_ITEM;
    }

    // 選択項目は常に1つでなければならない。
    /**
     * 項目のクリック
     * @param item item
     */
    function ItemClick(item: ListItem) {
      list.value.forEach((itm) => {
        itm.isSelected = false;
      });
      const selectItem = list.value.find((itm) => itm.id === item.id);
      if (!selectItem) return;
      selectItem.isSelected = true;
      selectedItem.value = selectItem;
    }

    return {
      list,
      selectedItem,
      listLength,
      selectedAuthority,

      onClickRoot,
      onClickBtnAdd,
      ItemClick,
      onClickButton,
      onClickButtonDelete,
    };
  },
});
</script>

<!-- styleを書くならscopedを付けてください -->
<style lang="scss">
// SCSS変数を使ってください

// クラス名は複数単語で構成してください
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  // gap: 10px;
  padding: 20px;
  border: 1px solid;
  margin: 0 auto;
  width: 400px;
  height: 300px;
  overflow: hidden scroll;
}

.frontInfo-name {
  height: 20px !important;
}
</style>
