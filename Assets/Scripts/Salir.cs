using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Salir : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        Vector3 viewPos = Camera.main.WorldToViewportPoint(transform.position);

        viewPos.x = Mathf.Clamp01(viewPos.x);

        transform.position = Camera.main.ViewportToWorldPoint(viewPos);

    }
}
