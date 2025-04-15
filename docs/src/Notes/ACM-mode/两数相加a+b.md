---
updateTime: 2025-04-13 16:20
---
基本的架构：

```java
import java.util.Scanner;
 
public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        while(sc.hasNextInt()){ //不止一组
            int n = sc.nextInt();
            for(int i = 0; i< n; i++){
                int a = sc.nextInt();
                int b = sc.nextInt();
                System.out.println(a+b);
            }
        }

        sc.close();
    }
}
```

- 导入 `java.util.Scanner`  
- 写 `Main 类的 main 方法`

### 一个用到了大部分技巧的例子

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        //针对每一组，开头给出行，每行开头给出数
        while(sc.hasNextInt()){
            int lines = sc.nextInt();
            for(int i = 0; i < lines; i++){
                //每行的逻辑，首先取总数
                int count = sc.nextInt();
                int sum = 0;
                for(int j = 0; j < count; j++){
                    sum += sc.nextInt();
                }
                System.out.println(sum);
                //最后一行输出后，不用加空行
                if ( i == lines - 1) break;
                System.out.println();
            }
        }
    }
}
```