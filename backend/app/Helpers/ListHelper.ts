export default class ListHelper {
  public static mixLists(list1: any[], list2: any[]) {
    return list1.flatMap((el, index) => [el, list2[index]]);
  }
}
