from transformers import pipeline
from pydub import AudioSegment
import numpy as np
import tempfile
import timeit

start = timeit.default_timer()

# Initialize the audio classification pipeline
pipe = pipeline("audio-classification", model="dima806/music_genres_classification")

# Define the classify_audio function
def classify_audio(filepath):
    try:
        preds = pipe(filepath)
        outputs = {}
        for p in preds:
            outputs[p["label"]] = p["score"]
        return outputs
    except Exception as e:
        print(f"An error occurred during classification: {e}")
        return {}

# Function to find the loudest section in the audio file
def find_loudest_section(audio, window_size_ms):
    """Find the loudest section in the audio file within a given window size.

    Args:
        audio (AudioSegment): The audio file.
        window_size_ms (int): The size of each window in milliseconds.

    Returns:
        AudioSegment: The loudest section of the audio file.
    """
    window_size = window_size_ms
    loudest_section = None
    max_amplitude = -np.inf

    for i in range(0, len(audio) - window_size, window_size):
        segment = audio[i:i + window_size]
        segment_amplitude = segment.dBFS
        if segment_amplitude > max_amplitude:
            max_amplitude = segment_amplitude
            loudest_section = segment

    return loudest_section
def predict_genre(audio_stream):
    # Load the audio file
    # audio = AudioSegment.from_file('end of the begining.mp3')
    audio = AudioSegment.from_file(audio_stream)

    # Define the window size (e.g., 30 seconds)
    window_size_ms = 30000

    # Find the loudest section
    loudest_section = find_loudest_section(audio, window_size_ms)

    # Ensure the loudest section is not None before proceeding
    if loudest_section:
        # Reduce the sample rate of the loudest section
        new_sample_rate = 22050  # Define the new sample rate (e.g., 22050 Hz)
        loudest_section = loudest_section.set_frame_rate(new_sample_rate)

        # Reduce the bitrate of the loudest section to 128 kbps
        loudest_section = loudest_section.set_frame_rate(44100).set_channels(2).set_sample_width(2)
        loudest_section = loudest_section.set_frame_rate(44100).set_channels(2).set_sample_width(2)

        # Save the processed loudest section as an audio file
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_file:
            temp_filename = 'optimized-audio.mp3'
            loudest_section.export(temp_filename, format='mp3')

        # Classify the loudest section of the audio file
        output = classify_audio(temp_filename)

        # Print the output genres and their scores
        if output:
            print("Predicted Genres and Scores:")
            for genre, score in output.items():
                print("Genre: {genre}, Score: {score}")
            stop = timeit.default_timer()
            print('Time: ', stop - start)
            return output
            
        else:
            print("No prediction available.")

        # Delete the temporary file
        # import os
        # os.remove(temp_filename)

    else:
        print("No loudest section found in the audio.")


'''
    1. Used the accurate model which took 3 minutes and 24 seconds.
    2. By trimming the loudest 30 seconds of the audio file, the prediction time reduced to 14 seconds with not much variance in accuracy.
    3. By reducing the sample rate to 22,050 hz, the prediction time didn't change. so, will keep it at 44100. but accuracy is reduced by 0.01%.
    4. By reducing the bitrate to 128 kbps, neither the prediction time or accuracy didn't change. so, will keep it at 128 kbps.
    5. Changed the flow of logic and saved around 0.5 seconds.
    6. No further improvements can be done.
    7. overall savings: 93.14%
    8. Very good optimizations.
'''