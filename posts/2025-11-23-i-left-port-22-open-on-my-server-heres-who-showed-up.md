---
title: I Left Port 22 Open On  My Server.Here's Who Showed Up
layout: _indvposts.njk
date: 2025-11-23T16:25:00.000+05:30
tags:
  - post
  - featured
draft: false
excerpt: 54,000 attacks in 48 hours. That is the reality of the modern internet.
  I deployed a Cowrie honeypot on Azure to analyze the background noise of the
  web. From the "Outlaw" crypto-mining group to Mirai-variant IoT scanners, this
  post breaks down the specific scripts, passwords, and signatures attackers
  used to try and hijack my serve
---
<h3>The "Always On" Myth</h3>

We always hear that attackers are "on the move 24x7." We hear that they use automation for everything rather than hacking manually. But hearing it is one thing; seeing it in your own logs is another.

This weekend, I decided to test that theory. I set up a honeypot server (Cowrie) on Microsoft Azure. I configured it to look like a standard, vulnerable Linux server and intentionally left Port 22 (SSH) open to the world.

**My Expectation:** I figured I was just a random IP address in a sea of millions of Azure servers. I expected a few hundred hits.

**The Reality:** I got 54,254.

The Data SnapshotDuration:
* 48 Hours 
* Total Events: 54,254
* Unique Attackers: 733 IPs
* Avg Attacks per Minute:  20 (one attack every 3 seconds)

<h3>Finding #1: The "Miner" Hunter (The mdrfckr Signature)</h3>
The most interesting catch wasn't a password attempt, but what the attacker tried to do once they got in. My logs caught a specific script that attempts to lock the server for itself.

**The Malicious Command:**

<blockqoutes>cd ~ && rm -rf .ssh && mkdir .ssh && echo "ssh-rsa AAAAB3... [redacted] ... mdrfckr">>.ssh/authorized_keys && chmod -R go= ~/.ssh </blockqoutes>

**The Analysis:** See the comment <u>mdrfckr</u> at the end of the key? This is a known signature associated with crypto-mining botnets (often linked to the Outlaw group).What it tries to achive:
1. It deletes my existing SSH keys (rm -rf .ssh).
2. It injects its own key so the attacker can log back in later.
3. It tries to use chattr (change attribute) to make the file immutable, effectively locking me (the admin) out of my own server so it can mine Monero undisturbed.

<h3>Finding #2: The Recon Script</h3>
Before deploying the miner, the bots need to know if the server is powerful enough. I captured this massive one-liner reconnaissance script:

<blockqoutes>Bashexport PATH=...; uname=$(uname -s -v -n -m); ... gpu_info=$(lspci | grep -i nvidia); ... echo "CPUS:$cpus"; echo "GPU:$gpu_info" </blockqoutes>

The Analysis:This script isn't looking for data; it's looking for **hardware**.
1. It explicitly greps for nvidia to see if I have a GPU (for mining).
2. It counts the CPUs.
3. If my Azure VM had been a powerful instance, the next command would have likely been a wget to download the XMRig miner.

<h3>Finding #3: The "IoT" Passwords </h3>

I extracted the top 10 passwords that the attackers tried. At first glance, they look random, but they tell a very specific story.
 
**Top 10 Passwords**
1. 345gs5662d34840 -> 1036 Times
2. 3245gs5662d34835 -> 1029 Times
3. 123456 -> 262 Times
4.
123 -> 131 Times
5. password -> 85 Times
6.1234 -> 68 Times
7. nPSpP4PBW0     -> 61 Times
8.12345678 -> 57 Times
9.P@ssw0rd -> 53 Times 
10. 12345 -> 52 Times

**The Insight:** The high volume of 345gs... passwords is the smoking gun. These aren't random strings.These are the factory default passwords for specific brands of IP Cameras and DVRs.This suggests I was being targeted by an IoT Botnet (likely a Mirai variant). The bots were blindly throwing these specific DVR credentials at my Azure server, hoping I was actually a vulnerable security camera they could recruit into their botnet fleet.

Also nPSp... this complex string appears to be a specific default credential for a Huawei/Netgear device, proving this is a dictionary atta

**The Top 10 Commands** 

Once they thought they were "in," here is what they tried to run.You can see them checking for GPUs (to mine crypto) and checking CPU architecture (to download the right malware binary).

![Top Commands Executed](/images/top_executed_commands.png)

**Visualizing the Attack**

I used Plotly (Python) to map the IP addresses of every attacker. While these IPs are likely just other infected machines (proxies), it gives a stunning visualization of the scale of the attack.

![World Map plotly](/images/map_plotly.png)

<h3>Conclusion</h3>
This experiment proved that "Security by Obscurity" is dead.I didn't advertise this server. I didn't verify it with a domain name. It was just a lonely IP address in the cloud. Yet, within 5 minutes, the automation found me.If you are putting infrastructure on the internet without strict firewalls or non-standard ports, you aren't hiding. As more companies shift to cloud infrastructure, the need to secure these servers is non-negotiable. You aren't hidden in the cloud; you're just next in line.
