# Node.js and MongoDB on Kubernetes

Quick example to locally run the Node.js application using Kubernetes and Docker 

# Prerequisites

### [Account on Docker Hub](https://hub.docker.com/)

### [minikube](https://minikube.sigs.k8s.io/docs/start/)

### [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

# Steps

## 1 - Building Docker container for our application

```
cd app

docker build -t <YOUR_DOCKER_HUB_USER_ID>/web-mongodb-k8s .
```

## 2 - Push Docker container on Docker Hub

```
docker login -u <YOUR_DOCKER_HUB_USER_ID>

docker push <YOUR_DOCKER_HUB_USER_ID>/web-mongodb-k8s
```

## 3 - Start minikube cluster(default driver is docker)

```
minikube start
```

## 4 - Create database controller and service in k8s

```
cd ../k8s

kubectl create -f db-controller.yml

kubectl create -f db-service.yml
```

You can check progress with the following command

```
kubectl get pods
```

```
NAME                     READY   STATUS    RESTARTS   AGE

mongo-controller-57xrw   1/1     Running   0          4m
```

## 5 - Create secret in k8s

```
kubectl create -f secret.yml
```

## 6 - Create web server controller and service in k8s

```
kubectl create -f web-controller.yml

kubectl create -f web-service.yml
```

Check the status

```
kubectl get pods
```

```
NAME                     READY   STATUS    RESTARTS   AGE

mongo-controller-57xrw   1/1     Running   0          6m
web-controller-9sf6w     1/1     Running   0          1m
web-controller-jgfzl     1/1     Running   0          1m
```

## 7 - Access to application

```
minikube service web

|-----------|------|-------------|----------------------------------------|
| NAMESPACE | NAME | TARGET PORT |            URL                         |
|-----------|------|-------------|----------------------------------------|
| default   | web  |          80 | http://<YOUR_CLUSTER_IP>:<CLUSTER_PORT>|
|-----------|------|-------------|----------------------------------------|
🎉  Opening service default/web in default browser...
```

Component         | URL                                      
---               | ---                                      
Swagger (API Ref) |  http://<YOUR_CLUSTER_IP>:<CLUSTER_PORT>/docs
