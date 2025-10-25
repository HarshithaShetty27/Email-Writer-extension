console.log("ComposeAI extension - Content script loaded.");

function createAIButton(){
    //TODO: Implement logic to create and return the AI Reply button element
}
function findComposeToolbar(){
    //TODO: Implement logic to find the compose toolbar element
}

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    if(existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("ComposeAI extension - Compose toolbar not found.");
        return;
    }
    console.log("ComposeAI extension - Toolbar found!, Injecting AI Reply button.");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async()=>{
        //TODO: Implement AI reply functionality
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations)=>{
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node=>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );
        if(hasComposeElements){
            console.log("ComposeAI extension - Detected compose elements added to the DOM.");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});