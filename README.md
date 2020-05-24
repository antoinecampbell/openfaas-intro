# openfaas-intro
Testing out [openfaas](https://www.openfaas.com/), running your own serverless functions in Kubernetes.

## Setup
**Note:** Kubernetes should already be setup running Minikube.

- View Kubernetes dashboard
    ```bash
    minikube dashboard
    ```
- Install Helm
    ```bash
    brew install helm
    ```
- Install faas-cli
    ```bash
    brew install faas-cli
    ```
- Add openfaas repo to helm
    ```bash
    helm repo add openfaas https://openfaas.github.io/faas-netes/
    ```
- Install openfaas from Helm chart to Kubernetes cluster
    ```bash
    helm repo update \
        && helm upgrade openfaas --install openfaas/openfaas \
        --namespace openfaas  \
        --set functionNamespace=openfaas-fn \
        --set generateBasicAuth=true 
    ```
- Get the generated admin password and set to an environment variables, view password
    ```bash
    export PASSWORD=$(kubectl -n openfaas get secret basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode)
    echo $PASSWORD
    ```
- Forward your local port 31112 to openfaas port in the cluster
    ```bash
    kubectl port-forward svc/gateway -n openfaas 31112:8080
    ```
- Set openfaas URL environment variables and login with faas-cli
    ```bash
    export OPENFAAS_URL=http://127.0.0.1:31112
    # Visit http://127.0.0.1:31112 in the browser to view openfaas UI
    echo -n $PASSWORD | faas-cli login --password-stdin
    ```
- Pull openfaas function templates (optional, sample function included in repo)
    ```bash
    faas-cli template pull
    ```
- Create node function from template (optional, sample function included in repo)
    ```bash
    faas-cli new test-node --lang node12
    ```
- If using Minikube, need to switch to the Docker API in the VM
    ```bash
    eval $(minikube docker-env)
    # To disconnect from the Docker API inside the Minikube VM
    eval $(minikube docker-env -u)
    ```
- If using Minikube, enable registry
    ```bash
    minikube addons enable registry
    ```
- Login to Minikube docker registry
    ```bash
    docker login localhost:5000
    # It should accept any username and password
    ```
- Build function
    ```bash
    faas-cli build -f test-node.yml
    ```
- Push function
    ```bash
    faas-cli push -f test-node.yml
    ```
- Deploy function
    ```bash
    faas-cli deploy -f test-node.yml
    ```
- Build, Push, and Deploy the function
    ```bash
    faas-cli up -f test-node.yml
    ```
- Function logs
    ```bash
    faas-cli logs test-node
    ```
- Remove function
    ```bash
    faas-cli remove -f test-node.yml
    ```