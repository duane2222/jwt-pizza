# Curiosity Report: Netflix Devops

One thing that I was curious about is what makes a DevOps team effective. I decided to do further research on how the Netflix DevOps works since they are often held up as one of the best in terms of DevOps culture. I want to also learn about the various tools that Netflix uses in order to have a good DevOps process since we talked about one such tool, Chaos Monkey.

## Netflix's Infrastructure
I found it interesting learning about how Netflix wanted to move its infrastructure over to the Cloud. The Cloud is more reliable and has better scalability than using relational databases in their own datacenter. They moved from vertically-scalable databases which are single points of failure to a horizontally-scalable system on the Cloud. They use AWS in order to handle their databases and manage systems.

Netflix wanted their systems to be very resilient since they faced a massive failure in 2008 where they faced a major database corruption. Afterwards an incident report showed that a third of their 8.4 million customers were affected. They decided to rewrite their applications in the cloud in order to avoid such disruptions to their system.

## Netflix's Tools
Another interesting thing that I found was how Netflix will build its own tools to fit their needs. One such tool is ChaosMonkey which we touch upon in class. They created this tool to randomly shut down server instances so that developers can test their software in unique situations which allows for their services to be highly resilient against back-end service outages. Also I found out that they have a Simian army which is a series of tools that Netflix engineers employ to test the reliability of their systems with ChaosMonkey being one of the tools.

Another tool that they created is a container management tool called Titus since Netflix uses it for resource management and container execution. Titus also has cloud-native integrations with AWS which allows it to work with cloud services and containers. It works natively with other open source software that Netflix has created to help with the operation of Netflix's systems.

## Conclusion
I found that the way that Netflix operates its DevOps team to be amazing as developers are responsible for the full software development life cycle instead of developers passing over their code to a separate ops team. They also focus on automating processes so that their services have more consistency and efficiency. I found it impressive how a developer is so involved in making sure that their code goes from development to deployment. The DevOps team at Netflix is very impressive as they build for failure meaning that they develop their applications while knowing that at some parts of the application won't work as expected. 



