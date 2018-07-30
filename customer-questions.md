Question 1:
Hello,

I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:
- Records
- Indexing

I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking." 

Cheers,
George
::::::::::::::::::::::::::::::::::::::::::
Hi George, 

Thank you for your message! These are great questions and I am happy to try to provide some clarity. I will address each concept by order in which you asked:

Records - Records are our structured entries in our Algolia index. Here is a quick example -- let's say
    you want to keep record of fruits based on two metrics: name and color. A record you would store 
    could look like this: {name:banana,color:yellow}. 
Indexing - When refering to an index in algolia, it is a place where structured information is stored. 
    You can design the structure of your information based on what you could imagine your users to be searching for. In the above fruits example one might create a fruits index to store all of the fruit records. When indexing using algolia it is a way to optimize lookup based on catgories (name, color). This is done automatically for you when adding records to an index.

Custom Ranking - This is very much dependant on what your users will be searching for.  I have found this to be a great introduction to custom ranking : https://www.algolia.com/doc/guides/ranking/custom-ranking/ 

I hope you find this information useful. Please let me know if you have any more questions -- I am always happy to help!
    
Thank you, 

Ben
925-453-8764
::::::::::::::::::::::::::::::::::::::::::


Question 2:
Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Regards,
Matt


:::::::::::::::::::::::::::::::::::::::
Hi Matt, 

Thank you so much for your feedback. This is the kind of information we always love recieving.

I totally understand that the added steps when trying to clear and delete indexes using the dashboard interface are pinch points in your development.

Have you tried making changes directly in your text editor? These are quick ways to clear or delete indexes without the extra clicks: 
for clearing an index: <index.clearIndex(callback)> and 
for deleting an index: <client.deleteIndex(indexNamecallback)>

I have found this resource to give some great examples of the actions listed above:(https://www.algolia.com/doc/api-reference/api-methods/clear-index/#examples).

I hope you find this information useful. Please let me know if you have any more questions -- I am always happy to hop on a call and walk through any pinchpoints with you!

Thank you, 

Ben
925-453-8764
:::::::::::::::::::::::::::::::::::::::


Question 3:
Hi,

I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?

Regards,
Leo

:::::::::::::::::::::::::::::::
Hi Leo, 

I am so happy to hear that you are looking to integrate Algolia in your website! I may be biased, but I think this is a wonderful decision :)

The process can be broken down into three steps:
    1) Structure and upload your data using our dashboard or directly in your text editor
    2) Apply your business logic and your users needs to the Search settings
    3) Building your website's search interface

I have found this resource in our documentation to serve as a great starting point and roadmap: https://www.algolia.com/doc/guides/getting-started/the-implementation-process/

Pleaes feel free to reach out to me directly with any question you may have, and I would love to work with you through this exciting process. 

Thank you, 

Ben
925-453-8764
::::::::::::::::::::::::::::::::
