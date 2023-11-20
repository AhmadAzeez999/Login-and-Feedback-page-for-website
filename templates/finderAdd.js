$(document).ready(function () 
{
    // Example: Append a new input field on button click
    let attributeCount = 0; // Initial count of attributes
    const maxAttributes = 5;

    $('button.add-attribute').on('click', function (e) 
    {
        e.preventDefault(); // Prevent form submission

        if (attributeCount < maxAttributes) 
        {
            attributeCount++;
            addAttributeField();

            if (attributeCount === maxAttributes)
                $('button.add-attribute').prop('disabled', true);
        }
    });

    function addAttributeField() 
    {
        const newInput = $('<input>', { type: 'text', class: 'productInput', placeholder: 'Enter attribute'});
        const newButton = $('<button>', { id: 'newDoneButton' + attributeCount, text: 'Done' });

        // Add e.preventDefault() to the new button
        newButton.on('click', function (e) 
        {
            e.preventDefault();
            // Button click logic here
            newButton.prop('disabled', true);
            newInput.prop('readonly', true);
        });

        const newCategory = $('<div>', { class: 'otherCategory', id: 'category' + attributeCount });

        newCategory.append(newInput);
        newCategory.append(newButton);
        $('.form-buttons').before(newCategory);
    }
});
