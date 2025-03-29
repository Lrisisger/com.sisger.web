# Etapa de build: base com OpenJDK e Maven instalado
FROM openjdk:17-jdk-alpine AS build

WORKDIR /app

# Atualiza os repositórios e instala o Maven
RUN apk update && apk add maven

# Copia o arquivo pom.xml e o diretório src para o container
COPY pom.xml .
COPY src ./src

# Compila o projeto e gera o JAR, ignorando os testes
RUN mvn clean package -DskipTests

# Etapa final: utiliza a imagem do OpenJDK para executar a aplicação
FROM openjdk:17-jdk-alpine

WORKDIR /app

# Copia o JAR gerado na etapa de build para o container final
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Variáveis de ambiente da aplicação

# Porta da aplicação
EXPOSE 8080

RUN echo "docker build -t lucaseduardo76/email-produto-pedido:latest ." && \
    echo "docker login" && \
    echo "docker push lucaseduardo76/email-produto-pedido:latest"

# Comando de inicialização da aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]