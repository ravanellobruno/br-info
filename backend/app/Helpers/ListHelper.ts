export default class ListHelper {
  public static mixedList(list1: any[], list2: any[]) {
    return list1.flatMap((el, i) => [el, list2[i]]);
  }
}
