# Distributed cloud marketplace
This project is a distributed cloud marketplace designed to allow clients to select and use services provided by multiple types of providers: App, Dataset, and Hardware. Clients can browse, select, and deploy resources tailored to their requirements. Each transaction is securely recorded on the blockchain, ensuring transparency, integrity, and reliable billing.

## Key Features
### Service Marketplace: A platform where clients can choose from a variety of service types:
- App Providers: Offer software applications that clients can deploy.
- Dataset Providers: Provide data resources for analytics, training, and other applications.
- Hardware Providers: Offer specialized hardware resources for high-performance or specific needs.
### Blockchain-Backed Transactions: Orders and proof of execution are stored on the blockchain, ensuring:
- Transparent billing and auditing.
- Secure and immutable transaction records.
- Proof of service execution.
### Intel SGX: TEE (Trust Execution Environment) that ensures confidentiality and integrity of execution



# Intended usage 
- Create an Account: Register as a client or provider.
- Browse Services: View available services from App, Dataset, and Hardware providers.
- Place an Order: Select services, place an order, and confirm billing.
- Execution Proof: Upon completion, execution proofs are generated and stored on the blockchain for transparency.

# Sequence diagram
![alt text](https://github.com/mouhamethdk/distributedcloudmarketplace/blob/main/docs/sequence_diagram.png?raw=true)


# For the team
Steps for a functional setup:
- Clone the repository:   `git clone <https link of the repo> `
- Enter the repository:   `cd distributedcloudmarketplace`
- Work on personal branch:   `git checkout <your_first_name>`. Check the existing branches before performing this action.
- Switch between branches:   `git checkout <name_of_the_branch`

To perform a push on your branch:
- Make sure you're on your own branch: `git checkout <your_first_name>`
- `git add <name_of_the_folder>`. Put `.` if all the directories must be added.
- `git commit -m <your_commit_message>`
- `git push origin <your_branch_name>`
