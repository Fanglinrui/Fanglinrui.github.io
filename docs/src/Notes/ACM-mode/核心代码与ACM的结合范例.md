```java
import java.util.*;

class TreeNode{
    char val;
    TreeNode left;
    TreeNode right;
  
    TreeNode(char val){ this.val = val; }
    TreeNode(char val, TreeNode left, TreeNode right){
        this.val = val;
        this.left = left;
        this.right = right;
    }
  
}
  
public class Main{
    public static void main(String[] args){
  
        Scanner sc = new Scanner(System.in);
        Solution solution = new Solution();
  
        while(sc.hasNextInt()){
            // 数字似乎没啥用
            sc.nextLine();
            String preOrder = sc.nextLine();
            String inOrder = sc.nextLine();
            TreeNode root = solution.makeTree(preOrder,inOrder);
  
            int height = solution.heighter(root, 1);
            System.out.println(height);
        }  

    }
}
  
class Solution{
    public TreeNode makeTree(String preOrder, String inOrder){
        if(preOrder.isEmpty() || preOrder == null) { return null; }
  
        // 从先根遍历的第一个点拿根，从中根遍历中获得两边的长度
        // 差分中根、先根
        char rootVal = preOrder.charAt(0);
        int idx = inOrder.indexOf(rootVal);
  
        String leftPre = preOrder.substring(1,idx+1);
        String leftIn = inOrder.substring(0, idx);
  
        String rightPre = preOrder.substring(idx+1);
        String rightIn = inOrder.substring(idx+1);
  
        TreeNode left = makeTree(leftPre,leftIn);
        TreeNode right = makeTree(rightPre, rightIn);
  
        return new TreeNode(rootVal, left, right);
  
    }
  
    public int heighter(TreeNode root, int height){
        if(root.left == null && root.right == null){
            return height;
        }
  
        height++;
        int right = root.right == null ? height : heighter(root.right, height);
        int left = root.left == null ? height : heighter(root.left, height);
  
        return Math.max(right, left);
    }
}
```