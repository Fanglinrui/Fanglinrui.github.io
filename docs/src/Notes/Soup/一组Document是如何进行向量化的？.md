---
updateTime: 2025-04-11 16:48
---
示例中，直接进行了`vectorStore.add()`，具体的向量化，没看见。

好像向量化直接蕴含在 `add()` 中了？
```java
public void add(List<Document> documents) {  
VectorStoreObservationContext observationContext = this.createObservationContextBuilder(Operation.ADD.value()).build();  
    VectorStoreObservationDocumentation.AI_VECTOR_STORE.observation(this.customObservationConvention, DEFAULT_OBSERVATION_CONVENTION, () -> observationContext, this.observationRegistry).observe(() -> this.doAdd(documents));  
}
```

向量化放在 doAdd 里面了（由向量数据库实现）

```java
public void doAdd(List<Document> documents) {  
    List<float[]> embeddings = this.embeddingModel.embed(documents, EmbeddingOptionsBuilder.builder().build(), this.batchingStrategy);  
    List<List<Document>> batchedDocuments = this.batchDocuments(documents);  
    batchedDocuments.forEach((batchDocument) -> this.insertOrUpdateBatch(batchDocument, documents, embeddings));  
}
```

如上，`embed(documents...)`

这里还用到了 #观察者模式