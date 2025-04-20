import tkinter as tk
from tkinter import Tk, messagebox, font
from pydub import AudioSegment
from pydub.playback import play
import time

root = tk.Tk()
root.title("Sound\tcalibration")

f = font.Font(family="Basic-Modification", size=20, weight=tk.NORMAL)

audio_path = r"C:\Users\33196\Desktop\Feng_Noti\Wenjian\.yp\Test\Sound calibration.wav"

messagebox.showinfo("Sound\tcalibration", "Calibrate your sound by clicking the 'Play sound' button.")
messagebox.showwarning("Suggesstion" ,"Open your audio.")

def play_sound():
    try:
        messagebox.showinfo("Notification", "Now playing...")
        print("3.9x lol.")
        a = AudioSegment.from_wav(audio_path)
        a = a.speedup(playback_speed = 3.9)
        play(a)
    except Exception as e:
        messagebox.showerror("Error", f"Could not play sound: {e}")

play_button = tk.Button(root, text=f"Play {audio_path}", command=play_sound)
play_button.config(font=f)
play_button.config(background="black", foreground="white")
play_button.pack(pady=20)

root.mainloop()
