# openfaas-intro
Testing out [openfaas](https://www.openfaas.com/), running your own serverless functions in Kubernetes.

## Setup
**Note:** Kubernetes should already be setup running Minikube.
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
- Pull openfaas function templates    
    ```bash
    faas-cli template pull
    ```
