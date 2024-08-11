# OPENAI_DEEPL_EXPRESS

This project is an Express.js-based REST API that leverages OpenAI, DeepL, and DetectLanguage services to offer two main functionalities: **text translation** and **AI-generated image creation**.

## Features

1. **Text Translation**:

   - Detects the language of a given text.
   - Translates the text into a specified target language.

2. **AI-Generated Images**:
   - Generates an image based on a provided textual prompt using OpenAI's DALL-E model.

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-powered-rest-api.git
   cd ai-powered-rest-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add your API keys:

   ```
   OPENAI_API_KEY=your-openai-api-key
   DETECT_LANGUAGE_API_KEY=your-detectlanguage-api-key
   DEEPL_AUTH_KEY=your-deepl-auth-key
   HOST=127.0.0.1
   PORT=8000
   ```

4. Start the server with the following command:

   ```bash
   node index.js
   ```

By default, the server will run on http://127.0.0.1:8000.

## API Endpoints

1. /translate - Translate Text

- Method: POST

- Description: Detects the language of the provided text and translates it into the specified target language.

- Request Body:
  convertTo (string): The target language code (e.g., "de" for German, "fr" for French).

  ```
  {
    "convertTo": "de"
  }
  ```

- Response:
  text (string): The original text.
  translatedText (string): The translated text.
  convertedFrom (string): The original language code.
  convertedTo (string): The target language code.

- Example Request:

  ```bash
  curl -X POST http://127.0.0.1:8000/translate \
    -H "Content-Type: application/json" \
    -d '{"convertTo": "de"}'
  ```

2.  /generate-image - Generate AI Image

- Method: POST

- Description: Generates an image based on the provided text prompt.

- Request Body:
  prompt (string): The description of the image to generate.

```
    {
    "prompt": "A futuristic cityscape at night with flying cars."
    }
```

- Response:
  image_url (string): The URL of the generated image.

- Example Request:

```bash
  curl -X POST http://127.0.0.1:8000/generate-image \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A futuristic cityscape at night with flying cars."}'
```

## Error Handling

- If any of the required parameters are missing or if an error occurs during processing, the API will return an appropriate error message with a corresponding HTTP status code.

## Dependencies

- express - Fast, unopinionated, minimalist web framework for Node.js
- dotenv - Loads environment variables from a .env file into process.env
- deepl-node - Official Node.js client for the DeepL API
- detectlanguage - Language detection API client for Node.js
- openai - Node.js client for the OpenAI API

## LICENSE

- This project is licensed under the MIT License.

## Acknowledgments

- [OpenAI](https://openai.com/index/openai-api/) for their powerful AI models.
- [DeepL](https://developers.deepl.com/docs) for their translation services.
- [DetectLanguage](https://detectlanguage.com/) for their language detection service.

## Contribution

Contributions are very important for me to enhance and expand this project! Whether you have ideas for new features, bug fixes, or improvements to existing code, your input is valuable.

To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request describing your changes.

Please make sure your contributions align with the project's goals and adhere to the coding standards. We appreciate your efforts in helping make this project better!

## Support

If you encounter any issues, have questions, or need assistance, please feel free to open an issue on the [GitHub repository](https://github.com/omrfrkcpr/openai-deepl-express/issues). We are here to help and will do our best to address your concerns promptly.

For any other inquiries or direct support, you can contact the project maintainer at [omerrfarukcapur@gmail.com](mailto:omerrfarukcapur@gmail.com).

Thank you for using and supporting this project!
