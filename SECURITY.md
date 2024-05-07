
# Security Policy

## Supported Versions

This section of the security policy communicates to users which versions of the project are currently supported with security updates. It helps users make informed decisions about which versions to use to ensure they benefit from the latest security patches.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Security is a critical priority for our project, and we value the input of our user community in keeping the project secure. This section outlines the process for the community to report security vulnerabilities confidentially.

### How to Report a Vulnerability

1. **Email**: Users should report vulnerabilities via email to [shivanshu.dwivedi@trincoll.edu (mailto:shivanshu.dwivedi@trincoll.edu). This method ensures that details of the vulnerability are kept confidential until an update can be issued.
2. **Expectations**: After reporting a vulnerability, users can expect an initial response within 48 hours, where the team will evaluate the issue and determine the necessary steps to address it.

### Response and Disclosure

- **Update Frequency**: We commit to providing regular updates on the status of the reported vulnerability, at least every 7 days.
- **Acceptance**: If the vulnerability is validated and accepted, we will work diligently on a fix and responsibly disclose the details, crediting the reporter if desired.
- **Rejection**: If a report is deemed not a vulnerability or is not applicable, we will respond with a detailed explanation.

## Security Best Practices

### NIST Compliance

We adhere to the NIST (National Institute of Standards and Technology) guidelines to ensure our security practices meet high standards. This involves regular updates and adherence to a framework that helps protect our infrastructure and data.

- **Risk Assessment**: We conduct regular risk assessments to identify and mitigate potential threats to cybersecurity.
- **Data Protection**: We ensure that all sensitive data is encrypted both at rest and in transit to protect it from unauthorized access.
- **Access Control**: We enforce strict access controls, ensuring that only authorized personnel have access to sensitive information, following the least privilege principle.

### Cloud Security Essentials

Our project is hosted in the cloud, and we follow best practices designed to secure our cloud environment.

- **Secure Configuration**: All cloud resources are configured following security best practices to prevent unauthorized access.
- **Regular Audits**: We perform regular security audits of our cloud infrastructure to identify and rectify potential security vulnerabilities.
- **Incident Response**: We have a robust incident response plan to quickly and effectively address security breaches should they occur.

### Managing Kubernetes Secrets

In our Kubernetes deployments, we manage secrets—which may include credentials and keys—carefully to avoid accidental exposure.

- **Encryption at Rest**: Secrets are encrypted in Kubernetes using keys managed through a Key Management Service (KMS).
- **Access Controls**: We use Role-Based Access Control (RBAC) to limit access to Kubernetes Secrets.
- **Audit Logs**: We enable auditing features in Kubernetes to log access and modifications to Secret objects, which helps in detecting and responding to unauthorized access or anomalies.

## Continuous Improvement

Our security processes are subject to continuous review and enhancement to adapt to the evolving cybersecurity landscape and reflect the latest in security practices and standards.

## Contact Information

For further questions or suggestions regarding our security practices, please contact us at [shivanshu.dwivedi@trincoll.edu](mailto:shivanshu.dwivedi@trincoll.edu).
